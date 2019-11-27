import { Document } from 'mongoose'

export interface Error extends Document {
    title: String;
    msg: String;
    category: String;
    level: String;
    col: Number;
    line: Number;
    appId: String;
    isNotify: Boolean;
    updatedAt: Date
}
