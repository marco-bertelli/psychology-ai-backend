import { QuestionTemplateType } from '../model';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface QuestionTemplateDocument extends Document {
    name: string,
    questionTemplateType: QuestionTemplateType,
    personalityId: Types.ObjectId,
    possibleAnswers: PossibleAnswer[]
}

export interface PossibleAnswer {
    answer: string,
    levelNumber: number
}