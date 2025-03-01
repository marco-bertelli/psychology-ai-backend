import { Document, Types } from 'mongoose';

export interface QuizResponsesDocument extends Document {
    userId: Types.ObjectId,
    day: Date,
    correctAnswers: Number,
    wrongAnswers: Number,
    totalAnswers: Number,
}