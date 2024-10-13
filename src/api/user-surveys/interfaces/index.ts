import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface UserSurveyDocument extends Document {
    userId: Types.ObjectId,
    personalityScores: PersonalityScore[],
    winningPersonalityId: Types.ObjectId,
    winningPersonalityScore: number,
    winningPersonalityName: string,
}

export interface PersonalityScore {
    personalityId: Types.ObjectId,
    score: number
}