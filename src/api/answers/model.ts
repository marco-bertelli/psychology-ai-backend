import { updatePersonalityScore, updateSurveyScore } from './middlewares';
import { Schema, model, Types } from 'mongoose';
import { AnswerDocument } from './interfaces';

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    surveyId: {
        type: Types.ObjectId,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    questionId: {
        type: Types.ObjectId,
        required: true,
    },
    personalityId: {
        type: Types.ObjectId,
    },
    personalityScore: {
        type: Number,
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

schema.index({ userId: 1, questionId: 1 }, { unique: true });

schema.pre('save', updatePersonalityScore);

schema.post('save', updateSurveyScore);

schema.virtual('question', {
    ref: 'Questions',
    localField: 'questionId',
    foreignField: '_id',
    justOne: true,
})

schema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
})

schema.virtual('personality', {
    ref: 'Personality',
    localField: 'personalityId',
    foreignField: '_id',
    justOne: true,
})

export const Answers = model<AnswerDocument>('Answers', schema);