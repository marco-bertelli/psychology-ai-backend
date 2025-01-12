import { QuestionsDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { Questions } from './model';
import { Response } from 'express';

import { Promise as BluebirdPromise } from 'bluebird';

import * as _ from 'lodash';
import { Answers } from '../answers/model';
import { CustomRequest } from '../_common-schemas/types';

const populationOptions = ['personality']

const actions = generateActions<QuestionsDocument>(Questions, populationOptions)

actions.index = async function ({ querymen: { query, cursor }, user }: CustomRequest, res: Response) {
    const resultsPromise = Questions.find({ ...query, userId: user._id })
        .skip(cursor.skip)
        .limit(cursor.limit)
        .sort(cursor.sort)
        .populate(populationOptions)
        .lean()
        .exec();

    const countPromise = Questions.countDocuments(query);

    const [results, count] = await Promise.all([resultsPromise, countPromise]);

    const populatedResults = await BluebirdPromise.map(results, async (result) => {
        const answer = await Answers.findOne({ questionId: result._id, userId: user._id }).populate('personality').lean();

        if (answer) {
            return { ...result, answer };
        }

        return result;
    });

    res.set('Odin-Count', count as unknown as string);
    res.send(populatedResults);
};

actions.getMySurveyQuestions = async function ({ user }: CustomRequest, res: Response) {
    const questionsPromise = Questions.find({ userId: user._id }).populate(populationOptions).sort({ order: 1 }).lean().exec();
    const countPromise = Questions.countDocuments({ userId: user._id });

    const [questions, count] = await Promise.all([questionsPromise, countPromise]);

    const populatedResults = await BluebirdPromise.map(questions, async (result) => {
        const answer = await Answers.findOne({ questionId: result._id, userId: user._id }).populate('personality').lean();

        if (answer) {
            return { ...result, answer };
        }

        return result;

    });

    res.set('Odin-Count', count as unknown as string);
    res.send(populatedResults);
}

export { actions };
