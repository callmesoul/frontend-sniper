import { Document } from 'mongoose'

export interface ErrorRecord extends Document  {
    id: String;
    errorId: String;
    records: Array<any>;
    user: String;
    status: Number;
    createdAt: Date;
}
