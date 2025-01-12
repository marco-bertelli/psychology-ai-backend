
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /questions List questions
 * @apiGroup Questions
 * @apiName RetrieveAll
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {Questions[]} questions List of questions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(), actions.index);

/**
 * @api {get} /questions/:id Retrieve Questions
 * @apiGroup Questions
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {Questions} Questions Questions's data.
 * @apiError 401 Admin access only.
 * @apiError 404 Questions not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {get} /questions/surveys/me Retrieve Questions
 * @apiGroup Questions
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {Questions} Questions Questions's data.
 * @apiError 401 Admin access only.
 * @apiError 404 Questions not found.
 **/
router.get('/surveys/me', token({ required: true }), actions.getMySurveyQuestions);

/**
 * @api {post} /questions Create Questions
 * @apiGroup Questions
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {Questions} Questions Questions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /questions/:id Update Questions
 * @apiGroup Questions
 * @apiName Update
 * @apiPermission Questions
 * @apiSuccess {Object} Questions Questions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Questions or admin access only.
 * @apiError 404 Questions not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /questions/:id Delete Questions
 * @apiName Delete
 * @apiGroup Questions
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Questions not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
