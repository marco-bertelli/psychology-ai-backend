import { Types, Schema } from 'mongoose';

export enum ChatRoleEnum {
    BOT = 'bot',
    USER = 'user',
};

const chatRoles = Object.values(ChatRoleEnum);

export const participantsSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        // ! This is a role of the user in the chat
        role: {
            type: String,
            enum: chatRoles,
        },
        lastReadTimestamp: { type: Number },
    },
    {
        _id: false,
        id: false,
    }
);

participantsSchema.virtual('user', {
    ref: 'User',
    foreignField: '_id',
    localField: 'userId',
    justOne: true,
});