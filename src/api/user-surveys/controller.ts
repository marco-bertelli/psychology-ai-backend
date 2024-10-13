import { UserSurveyDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { UserDocument } from '../users/interfaces';
import { UserSurvey } from './model';
import { Response } from 'express';

import * as _ from 'lodash';

const populationOptions = ['user']

const actions = generateActions<UserSurveyDocument>(UserSurvey, populationOptions);

actions.getMySurvey = async ({ user }: { user: UserDocument }, res: Response) => {
    const existingSurvey = await UserSurvey.findOne({ userId: user._id }).populate(populationOptions);

    if (existingSurvey) {
        return res.send(existingSurvey);
    }

    const survey = await UserSurvey.create({ userId: user._id });

    const populatedSurvey = await survey.populate(populationOptions);

    return res.send(populatedSurvey);
};

export { actions };
