
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /quiz-responses List quiz-responses
 * @apiGroup QuizResponse
 * @apiName RetrieveAll
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {QuizResponse[]} quiz-responses List of quiz-responses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', admin, query(), actions.index);

/**
 * @api {get} /quiz-responses/:id Retrieve QuizResponse
 * @apiGroup QuizResponse
 * @apiName Retrieve
 * @apiPermission user
 * @apiSuccess {QuizResponse} QuizResponse QuizResponse's data.
 * @apiError 401 Admin access only.
 * @apiError 404 QuizResponse not found.
 **/
router.get('/:id', admin, actions.show);

/**
 * @api {post} /quiz-responses Create QuizResponse
 * @apiGroup QuizResponse
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {QuizResponse} QuizResponse QuizResponse's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {post} /quiz-responses/me Create QuizResponse object and get result
 * @apiGroup QuizResponse
 * @apiName CreateQuizResponse
 * @apiPermission user
 * @apiSuccess (Success 201) {QuizResponse} QuizResponse QuizResponse's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 **/
router.post('/me', token({ required: true }), actions.createMyQuizResponse);

/**
 * @api {put} /quiz-responses/:id Update QuizResponse
 * @apiGroup QuizResponse
 * @apiName Update
 * @apiPermission QuizResponse
 * @apiSuccess {Object} QuizResponse QuizResponse's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current QuizResponse or admin access only.
 * @apiError 404 QuizResponse not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /quiz-responses/:id Delete QuizResponse
 * @apiName Delete
 * @apiGroup QuizResponse
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 QuizResponse not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
