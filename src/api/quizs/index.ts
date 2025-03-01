
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /quizs List quizs
 * @apiGroup Quizs
 * @apiName RetrieveAll
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {Quizs[]} quizs List of quizs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(), actions.index);

/**
 * @api {get} /quizs/:id Retrieve Quizs
 * @apiGroup Quizs
 * @apiName Retrieve
 * @apiPermission user
 * @apiSuccess {Quizs} Quizs Quizs's data.
 * @apiError 401 Admin access only.
 * @apiError 404 Quizs not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /quizs Create Quizs
 * @apiGroup Quizs
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {Quizs} Quizs Quizs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /quizs/:id Update Quizs
 * @apiGroup Quizs
 * @apiName Update
 * @apiPermission Quizs
 * @apiSuccess {Object} Quizs Quizs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Quizs or admin access only.
 * @apiError 404 Quizs not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /quizs/:id Delete Quizs
 * @apiName Delete
 * @apiGroup Quizs
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Quizs not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
