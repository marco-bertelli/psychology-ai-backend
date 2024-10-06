import { Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string,
    password: string,
    role: string,
    isConfirmed: Boolean,
    name: string,
    isEnabled: Boolean,
    last_login: Date,
    pre_last_login: Date,
    authenticate: (inputPwd: string, insertPwd: string) => any
}