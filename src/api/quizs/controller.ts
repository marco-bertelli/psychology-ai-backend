import { generateActions } from '../../services/generators';
import { CustomRequest } from '../_common-schemas/types';
import { QuizsDocument } from './interfaces';
import { Response } from 'express';
import { Quizs } from './model';

const actions = generateActions<QuizsDocument>(Quizs)

actions.getRandomQuiz = async (_req: CustomRequest, res: Response) => {
    const quiz = await Quizs.aggregate([{ $sample: { size: 1 } }])

    return res.send(quiz[0])
}

export { actions };
