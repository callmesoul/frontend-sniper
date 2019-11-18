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
    createdAt: { 
        type: Date,
        required: true,
        default: Date.now
    },
})