
import { Router } from 'express';

import { actions } from './controller';
import { admin, token } from '../../services/passport';

// @ts-ignore
import { middleware as query } from 'querymen';
import moment from 'moment';

const router = new (Router as any)();

/**
 * @api {get} /chats/me/daily get daily chat
 * @apiGroup chats
 * @apiName RetrieveDailyChat
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {chats} chat.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 **/
router.get('/me/daily', token({ required: true }), actions.getDailyChat);

/**
 * @api {get} /chats/:chatId/bot/response get bot response
 * @apiGroup chats
 * @apiName RetrieveBotResponse
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {chats} chat.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 **/
router.get('/:chatId/bot/response', token({ required: true }), query({ message: { type: String } }), actions.getBotResponse);

/**
 * @api {get} /chats/reports/me get my last 30 days reports
 * @apiGroup chats
 * @apiName RetrieveMyReports
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {chats} chat.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 **/
router.get('/reports/me', token({ required: true }), query({
    fromDate: { type: Date, operator: '$gte', default: moment().subtract(30, 'days').toDate() },
    toDate: { type: Date, operator: '$lte', default: new Date() },
}), actions.getMyReports);

/**
 * @api {get} /chats/reports/users/:userId get user last 30 days reports
 * @apiGroup chats
 * @apiName RetrieveSpecificUserReports
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {chats} chat.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 **/
router.get('/reports/users/:userId', admin, query({
    fromDate: { type: Date, operator: '$gte', default: moment().subtract(30, 'days').toDate() },
    toDate: { type: Date, operator: '$lte', default: new Date() },
}), actions.getUserReports);

export default router;
