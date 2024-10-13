import { QuestionsDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { Questions } from './model';
import { Response } from 'express';

import * as _ from 'lodash';

const populationOptions = ['personality']

const actions = generateActions<QuestionsDocument>(Questions, populationOptions)

actions.index = async function ({ querymen: { query, cursor }, user }: any, res: Response) {
    const resultsPromise = Questions.find({ ...query, userId: user._id })
        .skip(cursor.skip)
        .limit(cursor.limit)
        .sort(cursor.sort)
        .populate(populationOptions)
        .exec();

    const countPromise = Questions.countDocuments(query);

    const [results, count] = await Promise.all([resultsPromise, countPromise]);

    res.set('Odin-Count', count as unknown as string);
    res.send(results);
};

export { actions };
