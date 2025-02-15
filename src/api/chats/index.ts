
import { Router } from 'express';

import { actions } from './controller';
import { token } from '../../services/passport';

// @ts-ignore
import { middleware as query } from 'querymen';

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

export default router;
