import { ChatDocument } from '../interfaces';
import { ChatRoleEnum } from '../schemas';
import { ChatMessages } from '../../chat-messages/model';
import { UserSurvey } from '../../user-surveys/model';


type ExtendedChatDocument = ChatDocument & { wasNew: boolean, wasParticipantModified: boolean };

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

    next();
}