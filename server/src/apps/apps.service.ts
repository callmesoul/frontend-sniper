import { Injectable } from '@nestjs/common';
import { App } from '../interfaces/app.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateAppDto } from '../dtos/create-app.dto';
import { UpdateAppInput } from '../inputs/app.input';
import { UserInput } from '../inputs/user.input';
import { User } from '../interfaces/user.interface';
import { AuthenticationError } from 'apollo-server-core';
import { ObjectIdScalar } from '../scalars/object-id.scalar';

@Injectable()
export class AppsService {
    constructor(
        @InjectModel('App') private readonly appModel: Model<App>
    ){}

    async findUserApps(params: any): Promise<App []>{
        return await this.appModel.find().where(params).exec()
    }

    async create(params: CreateAppDto): Promise<App>{
        let app = await this.appModel.findOne().where({name: params.name});
        if(app){
            throw new Error('该项目名称已被使用');
        }else{
            app = await this.appModel.create(params);
            return app;
        }
    }

    async update(params: UpdateAppInput, user: User): Promise<App>{
        console.log('===')
        console.log(user)
        let app = await this.appModel.findById(params.id);
        if(app){
            if(user.id === app.userId){
                for ( let i in params){
                    app[i] = params[i]
                }
                await app.save();
                return app
            }else{
                throw new AuthenticationError('你没有权限操作')
            }
        }else{
            throw new Error('找不到该项目');
        }
    }

    async remove(id: ObjectIdScalar, user: User): Promise<Boolean>{
        let app = await this.appModel.findById(id);
        if(app){
            if(user.id === app.userId){
                await app.remove();
                return true;
            }else{
                throw new AuthenticationError('你没有权限操作')
            }
        }else{
            throw new Error('找不到该项目');
        }
    }
}
