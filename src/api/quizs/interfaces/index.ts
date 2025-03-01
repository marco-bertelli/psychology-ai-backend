import { Document } from 'mongoose';

export interface QuizsDocument extends Document {
    emotion: String,
    text: String,
}