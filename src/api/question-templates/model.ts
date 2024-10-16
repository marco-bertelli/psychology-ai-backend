import { QuestionTemplateDocument } from './interfaces/index';
import { calculateDefaultOrder } from './middlewares';
import { Schema, model, Types } from 'mongoose';

export enum QuestionTemplateType {
    LEVEL = 'level',
}

export const questionTypes = Object.values(QuestionTemplateType);

export const possibleAnswersSchema = new Schema({
    answer: {
        type: String,
        required: true,
    },
    levelNumber: {
        type: Number,
        required: true,
    },
}, { _id: false });

const schema = new Schema({
    order: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    questionTemplateType: {
        type: String,
        required: true,
        enum: questionTypes,
        default: QuestionTemplateType.LEVEL,
    },
    personalityId: {
        type: Types.ObjectId,
        required: true
    },
    possibleAnswers: {
        type: [possibleAnswersSchema],
        default: [],
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

schema.pre('save', calculateDefaultOrder);

schema.virtual('personality', {
    ref: 'Personality',
    localField: 'personalityId',
    foreignField: '_id',
    justOne: true,
})

export const QuestionTemplates = model<QuestionTemplateDocument>('QuestionTemplates', schema);