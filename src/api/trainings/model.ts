import { TrainingsDocument } from './interfaces';
import { Schema, model } from 'mongoose';
import { emotionNames } from '../chats/utils/consts';

const schema = new Schema({
    emotion: {
        type: String,
        required: true,
        enum: emotionNames,
    },
    text: {
        type: String,
        required: true,
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const Trainings = model<TrainingsDocument>('Trainings', schema);