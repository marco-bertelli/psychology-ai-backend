import { Schema, model, Types } from 'mongoose';
import { materializeQuestions } from './middlewares';
import { UserSurveyDocument } from './interfaces';

const personalityScoreSchema = new Schema({
    personalityId: {
        type: Types.ObjectId,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
}, { _id: false });

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        unique: true,
    },
    personalityScores: {
        type: [personalityScoreSchema],
        default: [],
    },
    winningPersonalityId: {
        type: Types.ObjectId,
    },
    winningPersonalityScore: {
        type: Number,
    },
    winningPersonalityName: {
        type: String,
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

schema.pre('save', materializeQuestions);

schema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
})

export const UserSurvey = model<UserSurveyDocument>('UserSurvey', schema);