import { calculateChatEmotions, findBotUser, mapChatParticipants } from './utils';
import { generateActions } from '../../services/generators';
import { CustomRequest } from '../_common-schemas/types';
import { ChatDocument } from './interfaces';
import { ChatRoleEnum } from './schemas';
import { Response } from 'express';
import { Chats } from './model';

import moment from 'moment';
import axios from 'axios';
import logger from '../../services/logger';

import _ from 'lodash';

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

actions.getBotResponse = async ({ params: { chatId }, querymen: { query: { message } }, headers }: CustomRequest, res: Response) => {
  if (!message) {
    return res.status(400).send({ message: 'message is required as query param' });
  }

  const chat = await Chats.findById(chatId).lean();

  if (!chat) {
    return res.status(404).send({ message: 'Chat not found' });
  }

  const userJwtToken = headers['Bearer']?.split(' ')[1];

  try {
    const response = await axios.get(`${process.env.BOT_API_URL}/chats/${chatId}?text=${message}`, {
      headers: {
        Authorization: `Bearer ${userJwtToken}`,
      },
    })

    res.send(response.data);

    await sleep(2000);

    await calculateChatEmotions(chat._id);
  } catch (error) {
    logger.error(error);

    return res.status(400).send({ message: 'Error while sending message' });
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

actions.getMyReports = async ({ user, querymen: { query: { fromDate, toDate } } }: CustomRequest, res: Response) => {
  const chats = await Chats.find({ userId: user._id, $and: [{ day: fromDate }, { day: toDate }] });

  const responseObject = chats.map((chat) => {
    return {
      day: moment(chat.day).format('YYYY-MM-DD'),
      userEmotions: chat.userEmotions,
      winningColor: _.maxBy(chat.userEmotions, 'score')?.exaColor || null,
    }
  });

  res.send(responseObject);
};

export { actions };
