
import { Chats } from '../../api/chats/model';

import schedule from 'node-schedule';
import moment from 'moment';

export const startScheduler = function () {
    schedule.scheduleJob('55 23 * * *', closeFinishedChats);
};

async function closeFinishedChats() {
    const startOfToday = moment().startOf('day').toDate();
    const endOfToday = moment().endOf('day').toDate();

    const chatsToClose = await Chats.find({ isChatClosed: false, day: { $gte: startOfToday, $lte: endOfToday } });

    for (const chat of chatsToClose) {
        chat.isChatClosed = true;

        await chat.save();
    }
}