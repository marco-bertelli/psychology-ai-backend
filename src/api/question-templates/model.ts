import { Schema, model, Types } from 'mongoose';
import { QuestionTemplateDocument } from './interfaces/index';

export enum QuestionTemplateType {
    LEVEL = 'level',
}

const questionTypes = Object.values(QuestionTemplateType);

const possibleAnswersSchema = new Schema({
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

schema.virtual('personality', {
    ref: 'Personality',
    localField: 'personalityId',
    foreignField: '_id',
    justOne: true,
})

export const QuestionTemplates = model<QuestionTemplateDocument>('QuestionTemplates', schema);