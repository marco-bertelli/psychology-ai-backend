
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /chat-messages List chat-messages
 * @apiGroup chat-messages
 * @apiName RetrieveAll
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {chat-messages[]} chat-messages List of chat-messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', admin, query(), actions.index);

/**
 * @api {get} /chat-messages/:id Retrieve chat-messages
 * @apiGroup chat-messages
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {chat-messages} chat-messages chat-messages's data.
 * @apiError 401 Admin access only.
 * @apiError 404 chat-messages not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /chat-messages Create chat-messages
 * @apiGroup chat-messages
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {chat-messages} chat-messages chat-messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /chat-messages/:id Update chat-messages
 * @apiGroup chat-messages
 * @apiName Update
 * @apiPermission chat-messages
 * @apiSuccess {Object} chat-messages chat-messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current chat-messages or admin access only.
 * @apiError 404 chat-messages not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /chat-messages/:id Delete chat-messages
 * @apiName Delete
 * @apiGroup chat-messages
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 chat-messages not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
