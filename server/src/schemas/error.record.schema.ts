import * as mongoose from 'mongoose'

export const ErrorRecordSchema = new mongoose.Schema({
    errorId: { 
        type: String,
        required: true
    },
    records: { 
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: [],
        comment:'用户操作记录'
    },
    user:{
        type: String,
        required: false,
        default: ''
    },
    status:{
        type: Number,
        required: true,
        default: 0,
        comment:'用户操作记录 0: 新记录；1：已阅； 2：已解决； '
    },
    createdAt: { 
        type: Date,
        required: true,
        default: Date.now
    },
})