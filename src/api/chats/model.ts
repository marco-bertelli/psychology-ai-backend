import { Schema, model, Types } from 'mongoose';
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
    participants: {
        type: [participantsSchema],
        required: true,
        bodymenIgnore: true,
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const Chats = model<ChatDocument>('Chats', schema);