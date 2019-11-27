import * as mongoose from 'mongoose'

export const ErrorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        comment:'错误标题'
    },
    msg:{
        type: mongoose.Schema.Types.Mixed,
        required: true,
        comment:'错误信息'
    },
    category: {
        type: String,
        required: false,
        comment:'错误类型'
    },
    level: {
        type: String,
        required: false,
        comment:'信息类型',
    },
    col: {
        type: Number,
        required: false,
        min: 0,
        default: 0
    },
    line: {
        type: Number,
        min: 0,
    },
    appId: {
        type: String,
        required: true,
        comment:'appid',
    },
    pageUrl: {
        type: String,
        required: false,
        comment:'页面地址',
    },
    isNotify: {
        type: Boolean,
        required: true,
        comment:'是否发送通知',
        default: true
    },
    updatedAt: { 
        type: Date,
        required: true, 
        default: Date.now,
        comment:'更新时间',
    }
})