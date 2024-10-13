
import { Router } from 'express';

import { admin, password as passwordAuth, token } from '../../services/passport';
import { actions } from './controller';

import { Types } from 'mongoose';

// @ts-ignore
import { middleware as query } from 'querymen';

const router = new (Router as any)();

const queryBody = {
    q: {
        type: String, parse: (value: any, field: any) => {
            return {
                $or: [
                    { name: { $regex: value, $options: 'i' } },
                    { surname: { $regex: value, $options: 'i' } }
                ]
            };
        }
    },
    role: {
        type: String
    },
}

/**
 * @api {get} /users List users
 * @apiGroup User
 * @apiName RetrieveAll
 * @apiPermission admin
 * @apiUse listParams
 * @apiSuccess {User[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 **/
router.get('/', token({ required: true }), query(queryBody), actions.index);

/**
 * @api {get} /users/me Retrieve current user
 * @apiGroup User
 * @apiName RetrieveCurrent
 * @apiPermission user
 * @apiSuccess {User} user User's data.
 **/
router.get('/me', token({ required: true }), actions.showMe);

/**
 * @api {get} /users/:id Retrieve user
 * @apiGroup User
 * @apiName Retrieve
 * @apiPermission admin
 * @apiSuccess {User} user User's data.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 **/
router.get('/:id', admin, actions.show);

/**
 * @api {post} /users Create user
 * @apiGroup User
 * @apiName Create
 * @apiPermission admin
 * @apiSuccess (Success 201) {User} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 **/
router.post('/', admin, actions.create);

/**
 * @api {put} /users/:id Update user
 * @apiGroup User
 * @apiName Update
 * @apiPermission user
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 **/
router.put('/:id', token({ required: true }), actions.update);

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiPermission basic
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiSuccess (Success 201) {User} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 **/
router.put('/:id/password', passwordAuth(), actions.updatePassword);

/**
 * @api {put} /users/:id/passwordReset Reset other users password
 * @apiName UpdatePasswordAdmin
 * @apiGroup User
 * @apiPermission admin
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 **/
router.put('/:id/passwordReset', admin, actions.updatePassword);

/**
 * @api {delete} /users/me Delete current user
 * @apiName DeleteMe
 * @apiGroup User
 * @apiPermission token
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 token access only.
 * @apiError 404 User not found.
 **/
router.delete('/me', token({ required: true }), actions.deleteMe);

/**
 * @api {delete} /users/:id Delete user
 * @apiName Delete
 * @apiGroup User
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 **/
router.delete('/:id', admin, actions.destroy);

export default router;
