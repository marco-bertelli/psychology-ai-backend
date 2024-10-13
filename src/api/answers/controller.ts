import { generateActions } from '../../services/generators';
import { AnswerDocument } from './interfaces';
import { Response } from 'express';
import { Answers } from './model';

import * as _ from 'lodash';

const populationOptions = ['personality', 'user', 'question']

const actions = generateActions<AnswerDocument>(Answers, populationOptions)

actions.index = async function ({ querymen: { query, cursor }, user }: any, res: Response) {
    const resultsPromise = Answers.find({ ...query, userId: user._id })
        .skip(cursor.skip)
        .limit(cursor.limit)
        .sort(cursor.sort)
        .populate(populationOptions)
        .exec();

    const countPromise = Answers.countDocuments(query);

    const [results, count] = await Promise.all([resultsPromise, countPromise]);

    res.set('Odin-Count', count as unknown as string);
    res.send(results);
};

export { actions };
