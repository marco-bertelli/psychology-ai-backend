import { UserSurveyDocument } from "../interfaces";
import { QuestionTemplates } from "../../question-templates/model";
import { Questions } from "../../questions/model";

import { Promise as BlueBirdPromise } from 'bluebird';

export async function materializeQuestions(this: UserSurveyDocument, next: Function) {
    if (!this.isNew) {
        return next();
    }

    const questionTemplates = await QuestionTemplates.find().lean();

    const userId = this.userId;

    await BlueBirdPromise.map(questionTemplates, (questionTemplate) => {
        delete questionTemplate._id;

        return Questions.create({ ...questionTemplate, userId })
    });

    return next();
}