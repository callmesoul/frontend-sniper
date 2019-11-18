import * as mongoose from 'mongoose'

export const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate:{
            validator: function(v) {
                return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(v);
            },
            message: '邮箱格式不正确'
        }
    },
    appId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
})