import { possibleAnswersSchema, QuestionTemplateType, questionTypes } from '../question-templates/model';
import { Schema, model, Types } from 'mongoose';
import { QuestionsDocument } from './interfaces';

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
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

schema.virtual('personality', {
    ref: 'Personality',
    localField: 'personalityId',
    foreignField: '_id',
    justOne: true,
})

export const Questions = model<QuestionsDocument>('Questions', schema);