import { ChatMessageDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { CustomRequest } from '../_common-schemas/types';
import { ChatMessages } from './model';
import { Response } from 'express';

const actions = generateActions<ChatMessageDocument>(ChatMessages);

actions.getChatMessages = async ({ params: { chatId } }: CustomRequest, res: Response) => {
    const chatMessages = await ChatMessages.find({ chatId }).sort({ timestamp: 1 });

    res.send(chatMessages);
};

export { actions };
