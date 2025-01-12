import { generateActions } from '../../services/generators';
import { AnswerDocument } from './interfaces';
import { CustomRequest } from '../_common-schemas/types';
import { Response } from 'express';
import { Answers } from './model';

import * as _ from 'lodash';
import { UserSurvey } from '../user-surveys/model';
import { Questions } from '../questions/model';

const populationOptions = ['personality', 'user', 'question']

const actions = generateActions<AnswerDocument>(Answers, populationOptions)

actions.index = async function ({ querymen: { query, cursor }, user }: CustomRequest, res: Response) {
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

actions.createAnswerForMySurvey = async function ({ body, params: { questionId }, user }: CustomRequest, res: Response) {
    const userSurvey = await UserSurvey.findOne({ userId: user._id}).lean();

    if (!userSurvey) {
        return res.status(404).send({ message: 'User survey not found' });
    }

    const question = await Questions.findById(questionId).lean();

    if (!question) {
        return res.status(404).send({ message: 'Question not found' });
    }

    if (!question.userId.equals(userSurvey.userId)) {
        return res.status(403).send({ message: 'You can only answer questions from your survey' });
    }

    if (!body || !body.answer) {
        return res.status(400).send({ message: 'You must provide an answer' });
    }

    if (!_.includes(question.possibleAnswers.map((a) => a.answer), body.answer)) {
        return res.status(400).send({ message: 'Invalid answer check question possibleAnswers field and pass the correct string' });
    }

    let answer = await Answers.findOne({ userId: user._id, questionId, surveyId: userSurvey._id });

    if (!answer) {
        answer = await Answers.create({
            userId: user._id,
            surveyId: userSurvey._id,
            questionId,
            answer: body.answer,
        });
    } else {
        answer.answer = body.answer as string;
    
        await answer.save();
    }

    res.status(201).send(answer);
}

export { actions };
