import { UserSurveyDocument } from '../../user-surveys/interfaces';
import { AnswerDocument } from '../interfaces';
import { Personality } from '../../personalities/model';
import { Questions } from '../../questions/model';
import { Answers } from '../model';
import { Types } from 'mongoose';
import { User } from '../../users/model';

import * as _ from 'lodash';

export async function oldPersonalityCalculation(doc: AnswerDocument, userSurvey: UserSurveyDocument) {
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
        const personalityAnswers = _.filter(answers, { personalityId: answer.personalityId });

        const personalityScore = _.reduce(personalityAnswers, (acc, pa) => acc + pa.personalityScore, 0);

        userSurvey.personalityScores[existingScoreIndex].score = personalityScore;
    });

    const maxPersonalityScore = _.maxBy(userSurvey.personalityScores, 'score');

    if (!maxPersonalityScore) {
        throw new Error('no max personality score found');
    }

    userSurvey.winningPersonalityId = maxPersonalityScore.personalityId;
    userSurvey.winningPersonalityScore = maxPersonalityScore.score;

    const personality = await Personality.findById(maxPersonalityScore.personalityId).lean();

    if (!personality) {
        throw new Error('personality not found');
    }

    userSurvey.winningPersonalityName = personality?.name;

    const questionsNumber = await Questions.countDocuments({ userId: userSurvey.userId });

    if (answers.length === questionsNumber) {
        userSurvey.isCompleted = true;
    }

    return userSurvey.save();
}

export async function personalityCalculation(doc: AnswerDocument, userSurvey: UserSurveyDocument) {
    const answersPromise = Answers.find({ surveyId: doc.surveyId }).lean();
    const userPromise = User.findById(userSurvey.userId).lean();

    const [answers, user] = await Promise.all([answersPromise, userPromise]);

    if (!user) {
        throw new Error('user not found');
    }

    const groupedAnswers = _.groupBy(answers, 'personalityId');

    const groupScores = _.map(groupedAnswers, (values, key) => {
        return {
            personalityId: key,
            score: _.reduce(values, (acc, answer) => acc + answer.personalityScore, 0) / values.length
        };
    });

    const allPersonalities = await Personality.find().lean();

    const arrayToCheck = user.sex === 'male' ? 'maleScores' : 'femaleScores';
    const userAge = user.age;

    const personalityDeviations = _.map(groupScores, (groupScore) => {
        const personality = _.find(allPersonalities, { _id: new Types.ObjectId(groupScore.personalityId) });

        if (!personality) {
            throw new Error('personality not found');
        }

        const ageRange: any = _.find(personality[arrayToCheck], (range: any) => {
            return userAge >= range.fromAge && (userAge <= range.toAge || _.isNil(range.toAge));
        });

        if (!ageRange) {
            throw new Error('age range not found');
        }

        return {
            personalityId: groupScore.personalityId,
            deviation: ageRange.mean - groupScore.score
        }
    });

    userSurvey.personalityScores = _.map(groupScores, (groupScore) => {
        return {
            personalityId: new Types.ObjectId(groupScore.personalityId),
            score: groupScore.score
        }
    });

    const winningPersonalityDeviation = _.maxBy(personalityDeviations, 'deviation');

    if (!winningPersonalityDeviation) {
        throw new Error('no winning personality deviation found');
    }

    userSurvey.winningPersonalityId = new Types.ObjectId(winningPersonalityDeviation.personalityId);
    userSurvey.winningPersonalityScore = winningPersonalityDeviation.deviation;

    const personality = await Personality.findById(winningPersonalityDeviation.personalityId).lean();

    if (!personality) {
        throw new Error('personality not found');
    }

    userSurvey.winningPersonalityName = personality?.name;

    const questionsNumber = await Questions.countDocuments({ userId: userSurvey.userId });

    if (answers.length === questionsNumber) {
        userSurvey.isCompleted = true;
    }

    return userSurvey.save();
}