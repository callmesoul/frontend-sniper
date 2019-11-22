import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface'
import { CreateUserDto } from '../dtos/create-user.dto';

export type User = any

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {}

    async findOne(params: any): Promise<User | undefined> {
        return await this.userModel.findOne().where(params);
    }
    
    async findById(id: String): Promise<User | undefined> {
        return await this.userModel.findById(id).exec();
    }

    async findAll(): Promise<User []> {
      return await this.userModel.find().exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
      const createUser = await this.userModel.create(createUserDto);
      return createUser;
    }
}
