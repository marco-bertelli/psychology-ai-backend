
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /question-templates List question-templates
 * @apiGroup QuestionTemplates
 * @apiName RetrieveAll
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {QuestionTemplates[]} question-templates List of question-templates.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(), actions.index);

/**
 * @api {get} /question-templates/:id Retrieve QuestionTemplates
 * @apiGroup QuestionTemplates
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {QuestionTemplates} QuestionTemplates QuestionTemplates's data.
 * @apiError 401 Admin access only.
 * @apiError 404 QuestionTemplates not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /question-templates Create QuestionTemplates
 * @apiGroup QuestionTemplates
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {QuestionTemplates} QuestionTemplates QuestionTemplates's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /question-templates/:id Update QuestionTemplates
 * @apiGroup QuestionTemplates
 * @apiName Update
 * @apiPermission QuestionTemplates
 * @apiSuccess {Object} QuestionTemplates QuestionTemplates's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current QuestionTemplates or admin access only.
 * @apiError 404 QuestionTemplates not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /question-templates/:id Delete QuestionTemplates
 * @apiName Delete
 * @apiGroup QuestionTemplates
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 QuestionTemplates not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
