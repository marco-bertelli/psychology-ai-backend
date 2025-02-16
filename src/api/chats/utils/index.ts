import { participantDocument } from "../interfaces";
import { ChatRoleEnum } from "../schemas";
import { Types } from "mongoose";
import { User } from "../../users/model";

import { ChatMessages } from "../../chat-messages/model";
import { Chats } from "../model";

import _ from 'lodash';

export function findBotUser() {
    return User.findOne({ email: 'bot@bot.com' }).lean();
}

export function mapChatParticipants(ids: Array<string | Types.ObjectId>, userId: Types.ObjectId, userRole: ChatRoleEnum): participantDocument[] {
    return ids.map(id => {
        return {
            userId: id,
            isAdmin: userId.equals(id) ? true : false,
            lastReadTimestamp: Date.now(),
            role: userId.equals(id) ? userRole : ChatRoleEnum.BOT
        } as participantDocument;
    });
}

export async function calculateChatEmotions(chatId: Types.ObjectId) {
    const messages = await ChatMessages.find({ chatId }).select('userEmotion').lean();

    const chat = await Chats.findById(chatId);

    if (!chat) {
        return;
    }

    const groupedEmotions = _.groupBy(messages, 'userEmotion');

    chat.userEmotions = chat.userEmotions.map((emotion: any) => {
        return {
            ...emotion,
            score: groupedEmotions[emotion['emotion']]?.length || 0
        };
    });

    await chat.save();
}