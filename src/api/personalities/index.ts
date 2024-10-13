
import { Router } from 'express';

import { admin, token } from '../../services/passport';
import { actions } from './controller';

// @ts-ignore
import { middleware as query } from 'querymen'

const router = new (Router as any)();

/**
 * @api {get} /personalities List personalities
 * @apiGroup Personality
 * @apiName RetrieveAll
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {Personality[]} personalities List of personalities.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query({
    q: {
        type: String, parse: (value: any, field: any) => {
            return {
                $or: [
                    { name: { $regex: value, $options: 'i' } },
                ]
            };
        }
    }
}), actions.index);

/**
 * @api {get} /personalities/:id Retrieve Personality
 * @apiGroup Personality
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {Personality} Personality Personality's data.
 * @apiError 401 Admin access only.
 * @apiError 404 Personality not found.
 **/
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /personalities Create Personality
 * @apiGroup Personality
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {Personality} Personality Personality's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /personalities/:id Update Personality
 * @apiGroup Personality
 * @apiName Update
 * @apiPermission Personality
 * @apiSuccess {Object} Personality Personality's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Personality or admin access only.
 * @apiError 404 Personality not found.
 **/
router.put('/:id', admin, actions.update);

/**
 * @api {delete} /personalities/:id Delete Personality
 * @apiName Delete
 * @apiGroup Personality
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Personality not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
