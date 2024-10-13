import { AnswerDocument } from "../interfaces";
import { UserSurvey } from "../../user-surveys/model";
import { Questions } from "../../questions/model";
import { Answers } from "../model";

import * as _ from 'lodash';
import { Personality } from "../../personalities/model";

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

    const answers = await Answers.find({ surveyId: doc.surveyId }).lean();

    _.map(answers, (answer) => {
        const existingScore = _.find(userSurvey.personalityScores, { personalityId: answer.personalityId });
    
        if (!existingScore) {
            return userSurvey.personalityScores.push({
                personalityId: answer.personalityId,
                score: answer.personalityScore,
            });
        }

        const existingScoreIndex = _.findIndex(userSurvey.personalityScores, { personalityId: answer.personalityId });

        userSurvey.personalityScores[existingScoreIndex].score += answer.personalityScore;
    });

    const maxPersonalityScore = _.maxBy(userSurvey.personalityScores, 'score');

    if (!maxPersonalityScore) return next('no max personality score found');

    userSurvey.winningPersonalityId = maxPersonalityScore.personalityId;
    userSurvey.winningPersonalityScore = maxPersonalityScore.score;

    const personality = await Personality.findById(maxPersonalityScore.personalityId).lean();

    if (!personality) return next('personality not found');

    userSurvey.winningPersonalityName = personality?.name;

    await userSurvey.save();

    next();
}