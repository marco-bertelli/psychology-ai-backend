import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface AnswerDocument extends Document {
    userId: Types.ObjectId,
    questionId: Types.ObjectId,
    answer: string,
    surveyId: Types.ObjectId,
    personalityId: Types.ObjectId,
    personalityScore: number,
}