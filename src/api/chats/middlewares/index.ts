import { ChatDocument } from '../interfaces';
import { ChatRoleEnum } from '../schemas';
import { ChatMessages } from '../../chat-messages/model';


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
        message: 'Ciao, di cosa vuoi parlare?',
    });
}

export async function setPostFields(this: ExtendedChatDocument, next: Function) {
    this.wasNew = this.isNew;
    this.wasParticipantModified = this.isModified('participants');

    next();
}