import { QuizResponsesDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { CustomRequest } from '../_common-schemas/types';
import { QuizResponses } from './model';
import e, { Response } from 'express';
import moment from 'moment';

const actions = generateActions<QuizResponsesDocument>(QuizResponses)

actions.createMyQuizResponse = async ({ user, body }: CustomRequest, res: Response) => {
    const { result } = body

    if (!result) {
        return res.status(400).send('result is required in body')
    }

    if (!["correct", "incorrect"].includes(String(result))) {
        return res.status(400).send('result must be either correct or incorrect')
    }

    const day = moment().startOf('day').toDate()

    const existingResponse = await QuizResponses.findOne({ userId: user._id, day });

    if (!existingResponse) {
        const createdResponse = await QuizResponses.create({
            userId: user._id,
            day,
            correctAnswers: result === "correct" ? 1 : 0,
            wrongAnswers: result === "incorrect" ? 1 : 0,
            totalAnswers: 1,
        })

        return res.send(createdResponse)
    }

    await QuizResponses.findOneAndUpdate({ _id: existingResponse._id }, {
        $inc: {
            correctAnswers: result === "correct" ? 1 : 0,
            wrongAnswers: result === "incorrect" ? 1 : 0,
            totalAnswers: 1,
        }
    });

    const updatedResponse = await QuizResponses.findOne({ _id: existingResponse._id });

    return res.send(updatedResponse)
}

actions.getMyQuizResponse = async ({ user }: CustomRequest, res: Response) => {
    const day = moment().startOf('day').toDate()

    const existingResponse = await QuizResponses.findOne({ userId: user._id, day });

    if (!existingResponse) {
        const createdResponse = await QuizResponses.create({
            userId: user._id,
            day,
        })

        return res.send(createdResponse);
    }

    return res.send(existingResponse);
}

export { actions };
