import { ChatRoleEnum } from "../schemas";
import { Types } from "mongoose";
import { User } from "../../users/model";
import { participantDocument } from "../interfaces";

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