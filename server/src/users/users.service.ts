import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export type User = any

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {
        this.users = [
            {
              userId: 1,
              username: 'john',
              password: 'changeme',
            },
            {
              userId: 2,
              username: 'chris',
              password: 'secret',
            },
            {
              userId: 3,
              username: 'maria',
              password: 'guess',
            },
        ];
    }

    async findOne(username: String): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async create()
}
