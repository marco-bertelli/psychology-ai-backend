
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /user-surveys List user-surveys
 * @apiGroup UserSurvey
 * @apiName RetrieveAll
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {UserSurvey[]} user-surveys List of user-surveys.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(), actions.index);

/**
 * @api {get} /user-surveys/:id Retrieve UserSurvey
 * @apiGroup UserSurvey
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {UserSurvey} UserSurvey UserSurvey's data.
 * @apiError 401 Admin access only.
 * @apiError 404 UserSurvey not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /user-surveys Create UserSurvey
 * @apiGroup UserSurvey
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {UserSurvey} UserSurvey UserSurvey's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /user-surveys/:id Update UserSurvey
 * @apiGroup UserSurvey
 * @apiName Update
 * @apiPermission UserSurvey
 * @apiSuccess {Object} UserSurvey UserSurvey's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current UserSurvey or admin access only.
 * @apiError 404 UserSurvey not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /user-surveys/:id Delete UserSurvey
 * @apiName Delete
 * @apiGroup UserSurvey
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 UserSurvey not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
