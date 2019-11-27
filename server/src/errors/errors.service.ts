import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Error } from '../interfaces/error.interface'
import { App } from '../interfaces/app.interface';
import { ErrorRecord } from '../interfaces/error-record.interface';

@Injectable()
export class ErrorsService {
    constructor(
        @InjectModel('Error') private readonly errorModal: Model<Error>,
        @InjectModel('App') private readonly appModal: Model<App>,
        @InjectModel('ErrorRecord') private readonly errorRecord: Model<ErrorRecord>
    ){}

    async findUserApps(userId: String): Promise<any>{
        let apps = await this.appModal.distinct('_id',{ userId: userId});
        let errors = await this.errorModal.find({id: { $in: apps}});
        return errors
    }
}
