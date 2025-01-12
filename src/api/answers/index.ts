
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /answers List answers
 * @apiGroup Answer
 * @apiName RetrieveAll
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {Answer[]} answers List of answers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(), actions.index);

/**
 * @api {get} /answers/:id Retrieve Answer
 * @apiGroup Answer
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {Answer} Answer Answer's data.
 * @apiError 401 Admin access only.
 * @apiError 404 Answer not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /answers Create Answer
 * @apiGroup Answer
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {Answer} Answer Answer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {post} /answers/questions/:questionId/me Create Answer for my survey question
 * @apiGroup Answer
 * @apiName CreateForMySurvey
 * @apiPermission user
 * @apiSuccess (Success 201) {Answer} Answer Answer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 **/
router.post('/questions/:questionId/me', token({ required: true }), actions.createAnswerForMySurvey);

/**
 * @api {put} /answers/:id Update Answer
 * @apiGroup Answer
 * @apiName Update
 * @apiPermission Answer
 * @apiSuccess {Object} Answer Answer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Answer or admin access only.
 * @apiError 404 Answer not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /answers/:id Delete Answer
 * @apiName Delete
 * @apiGroup Answer
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Answer not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
