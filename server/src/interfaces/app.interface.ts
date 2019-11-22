import { Document } from 'mongoose'

export interface App extends Document {
    id: String,
    appScrect: String,
    domain: String,
    isNotify: Boolean,
    name: String,
    userId: String,
    createdAt: Date
}
