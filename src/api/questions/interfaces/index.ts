import { QuestionTemplateType } from '../../question-templates/model';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface QuestionsDocument extends Document {
    userId: Types.ObjectId,
    order: number,
    name: string,
    questionTemplateType: QuestionTemplateType,
    personalityId: Types.ObjectId,
    possibleAnswers: PossibleAnswer[]
}

export interface PossibleAnswer {
    answer: string,
    levelNumber: number
}