import { Document } from 'mongoose';

export interface TrainingsDocument extends Document {
    emotion: String,
    text: String,
}