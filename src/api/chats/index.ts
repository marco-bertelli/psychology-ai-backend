
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /chats List chats
 * @apiGroup chats
 * @apiName RetrieveAll
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {chats[]} chats List of chats.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(), actions.index);

/**
 * @api {get} /chats/:id Retrieve chats
 * @apiGroup chats
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {chats} chats chats's data.
 * @apiError 401 Admin access only.
 * @apiError 404 chats not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /chats Create chats
 * @apiGroup chats
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {chats} chats chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /chats/:id Update chats
 * @apiGroup chats
 * @apiName Update
 * @apiPermission chats
 * @apiSuccess {Object} chats chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current chats or admin access only.
 * @apiError 404 chats not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /chats/:id Delete chats
 * @apiName Delete
 * @apiGroup chats
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 chats not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
