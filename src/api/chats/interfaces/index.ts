import { QuestionTemplateType } from '../../question-templates/model';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { ChatRoleEnum } from '../schemas';

export interface ChatDocument extends Document {
    userId: Types.ObjectId,
    day: Date,
    participants: participantDocument[],
    userEmotions: Object[],
    personality: String,
}

export interface participantDocument {
    userId: Types.ObjectId,
    isAdmin: boolean,
    role: ChatRoleEnum,
    lastReadTimestamp: number
}