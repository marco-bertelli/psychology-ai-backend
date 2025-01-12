import { ChatMessageDocument } from '../interfaces';
import { Chats } from '../../chats/model';
import { User } from '../../users/model';

export async function populateChatSender(this: ChatMessageDocument, next: Function) {
    if (!this.isNew) {
        return next();
    }

    const chat = await Chats.findById(this.chatId).lean();

    if (!chat) {
        return next('Chat not found');
    }

    const senderParticipant = chat.participants.find(
        (participant) => participant.userId.equals(this.senderId)
    );

    if (!senderParticipant) {
        return next('Participant not found');
    }

    const participantUser = await User.findById(senderParticipant.userId).lean();

    if (!participantUser) {
        return next('User not found');
    }

    this.chatSenderEmail = participantUser.email;
    this.chatSenderRole = senderParticipant.role;

    next();
}