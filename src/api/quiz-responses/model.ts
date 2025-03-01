import { Schema, model, Types } from 'mongoose';
import { QuizResponsesDocument } from './interfaces';

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    day: {
        type: Date,
        required: true,
    },
    correctAnswers: {
        type: Number,
        default: 0,
    },
    wrongAnswers: {
        type: Number,
        default: 0,
    },
    totalAnswers: {
        type: Number,
        default: 0,
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const QuizResponses = model<QuizResponsesDocument>('QuizResponses', schema);