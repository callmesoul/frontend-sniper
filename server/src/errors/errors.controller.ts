import { Controller, Post, Request, Header, Headers, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from '../interfaces/error.interface';
import { App } from '../interfaces/app.interface';
import { ErrorRecord } from '../interfaces/error-record.interface';

@Controller('errors')
export class ErrorsController {
    constructor(
        @InjectModel('Error') readonly errorModel: Model<Error>,
        @InjectModel('App') readonly appModel: Model<App>,
        @InjectModel('ErrorRecord') private readonly errorRecordModel: Model<ErrorRecord>
    ){}


    @Post()
    async create(
        @Headers('appsecret') appsecret: string,
        @Headers('host') host: string,
        @Body() body,
    ){
        console.log(host);
        console.log(body);
        if(appsecret){
            let app = await this.appModel.findById(appsecret);
            if(app){
                if(app.domain === '*' || app.domain === host){
                    if(body.msg && typeof(body.msg) !== 'string'){
                        body.msg = JSON.stringify(body.msg);
                    }
                    let error = await this.errorModel.findOne({
                        title: body.title,
                        msg: body.msg,
                        category: body.category,
                        level: body.level,
                        col: body.col,
                        line: body.line,
                        appId: app.id,
                        pageUrl: body.pageUrl,
                    })
                    if(error){
                        error.update({updatedAt: new Date()});
                    }else{
                        error = await this.errorModel.create({
                            ...body,
                            appId: app.id,
                        })
                    }
                    let errorRecord = await this.errorRecordModel.create({...body,errorId: error.id});
                    return '已记录错误';
                } else {
                    return '非法域名，非法操作';
                }
            } else {
                return '项目不存在'
            }
        } else {
            return '项目不存在'
        }
    }
}
