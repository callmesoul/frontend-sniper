import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
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
    createdAt: { 
        type: Date, 
        default: Date.now
    }
})