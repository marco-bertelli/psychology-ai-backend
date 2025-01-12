
import { Router } from 'express';

import { actions } from './controller';
import { token } from '../../services/passport';

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

export default router;
