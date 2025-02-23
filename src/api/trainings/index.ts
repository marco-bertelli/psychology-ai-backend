
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /trainings List trainings
 * @apiGroup Trainings
 * @apiName RetrieveAll
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {Trainings[]} trainings List of trainings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(), actions.index);

/**
 * @api {get} /trainings/emotions List trainings avvailable emotions
 * @apiGroup Trainings
 * @apiName RetrieveAllEmotions
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {Trainings[]} trainings List of trainings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/emotions', token({ required: true }), query(), actions.getAllEmotions);

/**
 * @api {get} /trainings/:id Retrieve Trainings
 * @apiGroup Trainings
 * @apiName Retrieve
 * @apiPermission user
 * @apiSuccess {Trainings} Trainings Trainings's data.
 * @apiError 401 Admin access only.
 * @apiError 404 Trainings not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /trainings Create Trainings
 * @apiGroup Trainings
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {Trainings} Trainings Trainings's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /trainings/:id Update Trainings
 * @apiGroup Trainings
 * @apiName Update
 * @apiPermission Trainings
 * @apiSuccess {Object} Trainings Trainings's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Trainings or admin access only.
 * @apiError 404 Trainings not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /trainings/:id Delete Trainings
 * @apiName Delete
 * @apiGroup Trainings
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Trainings not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
