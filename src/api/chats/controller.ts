import { findBotUser, mapChatParticipants } from './utils';
import { generateActions } from '../../services/generators';
import { CustomRequest } from '../_common-schemas/types';
import { ChatDocument } from './interfaces';
import { ChatRoleEnum } from './schemas';
import { Response } from 'express';
import { Chats } from './model';

import moment from 'moment';

const actions = generateActions<ChatDocument>(Chats);

actions.getDailyChat = async ({ user }: CustomRequest, res: Response) => {
    const today = new Date();
    const todayStart = moment(today).startOf('day').toDate();
    const todayEnd = moment(today).endOf('day').toDate();

    const chat = await Chats.findOne({ userId: user._id, $and: [{ day: { $gte: todayStart } }, { day: { $lte: todayEnd } }] });

    if (chat) {
        return res.send(chat);
    }

    const botUser = await findBotUser();

    if (!botUser) {
      return res.status(404).send({ message: 'Bot user not found' });
    }

    const participants = mapChatParticipants([botUser._id, user._id], user._id, ChatRoleEnum.USER);

    const createdChat = await Chats.create({
      participants: participants,
      userId: user._id,
    });

    res.send(createdChat);
};

export { actions };
