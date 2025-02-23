import { defaultUserEmotions } from '../chats/utils/consts';
import { TrainingsDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { CustomRequest } from '../_common-schemas/types';
import { Trainings } from './model';
import { Response } from 'express';

const actions = generateActions<TrainingsDocument>(Trainings)

actions.getAllEmotions = async (_req: CustomRequest, res: Response) => {
    const emotions = defaultUserEmotions.map((emotion) => ({ emotion: emotion.emotion, exaColor: emotion.exaColor }));

    res.send(emotions);
}

export { actions };
