import { Schema, model, Types } from 'mongoose';
import { ChatMessageDocument } from './interfaces';
import { populateChatSender } from './middlewares';

const schema = new Schema({
    senderId: {
        type: Types.ObjectId,
        required: true,
    },
    chatId: {
        type: Types.ObjectId,
    },
    timestamp: {
        type: Number,
        default: Date.now
    },
    message: {
        type: String,
    },
    chatSenderRole: {
        type: String,
    },
    chatSenderEmail: {
        type: String,
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

schema.pre('save', populateChatSender)

export const ChatMessages = model<ChatMessageDocument>('ChatMessages', schema);