import { Document } from 'mongoose'

export interface User extends Document{
    id: String,
    username: string,
    password: string,
    email: string,
    createdAt: string
}
