
import { Router } from 'express';

import { token } from '../../services/passport';
import { actions } from './controller';

const router = new (Router as any)();

/**
 * @api {get} /chat-messages/chats/:chatId List chat-messages for selected chat
 * @apiGroup chat-messages
 * @apiName RetrieveChatMessages
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {chat-messages[]} chat-messages List of chat-messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/chats/:chatId', token({required: true}), actions.getChatMessages);

export default router;
