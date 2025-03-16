import { oldPersonalityCalculation, personalityCalculation } from "../utils";
import { AnswerDocument } from "../interfaces";
import { UserSurvey } from "../../user-surveys/model";
import { Questions } from "../../questions/model";
import { User } from "../../users/model";

export async function updatePersonalityScore(this: AnswerDocument, next: Function) {
    if (!this.isNew && !this.isModified('answer')) return next();

    const question = await Questions.findById(this.questionId).lean();

    if (!question) return next('question not found');

    const personalityId = question.personalityId;
    const possibleAnswer = question.possibleAnswers.find((pa) => pa.answer === this.answer);

    if (!possibleAnswer) return next('answer not found in original question');

    this.personalityId = personalityId;
    this.personalityScore = possibleAnswer.levelNumber;

    next();
}

export async function updateSurveyScore(doc: AnswerDocument, next: Function) {
    const userSurvey = await UserSurvey.findById(doc.surveyId);

    if (!userSurvey) return next('survey not found');

    const user = await User.findById(userSurvey.userId).lean();

    if (!user) {
        return next();
    }

    let calculationFunction;

    if (!user.sex || !user.age) {
        calculationFunction = oldPersonalityCalculation;
    } else {
        calculationFunction = personalityCalculation;
    }

    try {
        await calculationFunction(doc, userSurvey);
    } catch (e: any) {
        return next(e.message);
    }

    next();
}