import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface ChatMessageDocument extends Document {
    senderId: Types.ObjectId,
    chatId: Types.ObjectId,
    timestamp: number,
    message: string,
    chatSenderRole: string,
    chatSenderEmail: string,
    userEmotion: string,
}