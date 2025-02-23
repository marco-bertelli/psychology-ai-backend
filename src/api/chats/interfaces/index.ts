import { QuestionTemplateType } from '../../question-templates/model';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { ChatRoleEnum } from '../schemas';
import { UserEmotion } from '../utils/consts';

export interface ChatDocument extends Document {
    userId: Types.ObjectId,
    day: Date,
    participants: participantDocument[],
    userEmotions: UserEmotion[],
    personality: String,
    isChatClosed: boolean,
    summary: String,
}

export interface participantDocument {
    userId: Types.ObjectId,
    isAdmin: boolean,
    role: ChatRoleEnum,
    lastReadTimestamp: number
}