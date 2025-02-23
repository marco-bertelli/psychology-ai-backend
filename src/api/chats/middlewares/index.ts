import { ChatDocument } from '../interfaces';
import { ChatRoleEnum } from '../schemas';
import { ChatMessages } from '../../chat-messages/model';
import { UserSurvey } from '../../user-surveys/model';
import { Chats } from '../model';

import config from '../../../config';
import axios from 'axios';

const { masterKey } = config;

type ExtendedChatDocument = ChatDocument & { wasNew: boolean, wasParticipantModified: boolean, wasChatClosedModified: boolean };

export async function insertDefaultMessage(doc: ExtendedChatDocument, next: Function) {
    if (!doc.wasNew) {
        return next();
    }

    const botParticipant = doc.participants.find((participant) => participant.role === ChatRoleEnum.BOT);

    if (!botParticipant) {
        return next();
    }

    await ChatMessages.create({
        chatId: doc._id,
        senderId: botParticipant.userId,
        message: 'Ciao, come va?',
    });
}

export async function materializeUserPersonality(this: ExtendedChatDocument, next: Function) {
    if (!this.isNew) {
        return next();
    }

    const userSurvey = await UserSurvey.findOne({ userId: this.userId }).lean();

    if (!userSurvey) {
        return next();
    }

    this.personality = userSurvey.winningPersonalityName;

    next();
}

export async function setPostFields(this: ExtendedChatDocument, next: Function) {
    this.wasNew = this.isNew;
    this.wasParticipantModified = this.isModified('participants');
    this.wasChatClosedModified = this.isModified('isChatClosed');

    next();
}

export async function generateChatSummary(doc: ExtendedChatDocument, next: Function) {
    if (!doc.wasChatClosedModified || !doc.isChatClosed) {
        return next();
    }

    let response;

    try {
        response = await axios.get(`${process.env.BOT_API_URL}/chats/${doc._id}/summary`, {
            headers: {
                Authorization: `Bearer ${masterKey}`,
            },
        })
    } catch (error) {
        response = { data: 'Error while fetching summary' };
    }

    await Chats.updateOne({ _id: doc._id }, { summary: response.data });

    next();
}

export async function autoCloseChat(this: ChatDocument, next: Function) {
    const currentChatMessagesNumber = await ChatMessages.countDocuments({ chatId: this._id, chatSenderRole: { $ne: 'bot' } });

    if (currentChatMessagesNumber < 20) {
        return next();
    }

    this.isChatClosed = true;

    next();
}