import { generateChatSummary, insertDefaultMessage, materializeUserPersonality, setPostFields } from './middlewares';
import { Schema, model, Types } from 'mongoose';
import { defaultUserEmotions } from './utils/consts';
import { participantsSchema } from './schemas';
import { ChatDocument } from './interfaces';

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
    },
    day: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
    personality: {
        type: String,
    },
    userEmotions: {
        type: [Object],
        default: defaultUserEmotions,
    },
    participants: {
        type: [participantsSchema],
        required: true,
        bodymenIgnore: true,
    },
    isChatClosed: {
        type: Boolean,
        default: false,
    },
    summary: {
        type: String
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

schema.pre('save', setPostFields);
schema.pre('save', materializeUserPersonality);

schema.post('save', insertDefaultMessage);
schema.post('save', generateChatSummary);

export const Chats = model<ChatDocument>('Chats', schema);