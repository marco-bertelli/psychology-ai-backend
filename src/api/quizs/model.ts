import { QuizsDocument } from './interfaces';
import { Schema, model } from 'mongoose';

export const answersSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
}, { _id: false });

const schema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [answersSchema],
        required: true,
        default: [],
    },
    correctAnswerId: {
        type: String,
        required: true,
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const Quizs = model<QuizsDocument>('Quizs', schema);