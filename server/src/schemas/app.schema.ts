import * as mongoose from 'mongoose'

export const AppSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
        default: '',
        comment: '绑定的域名'
    },
    isNotify: {
        type: Boolean,
        required: true,
        default: true,
        comment: '项目是否开启通知提醒？',
    },
    name: {
        type: String,
        required: true,
        comment: '项目名',
    },
    userId: {
        type: String,
        required: true,
        comment: '创建用户',
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        comment: '创建时间',
    }
})