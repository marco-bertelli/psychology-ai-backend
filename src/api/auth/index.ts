import { Router } from 'express';

import { master, password, token } from '../../services/passport';
import { actions } from '../users/controller';
import { login } from './controller';

const router = new (Router as any)();
/**
 * @api {post} /auth/register Register an user
 * @apiGroup Auth
 * @apiName Register
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {User} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 403 Forbidden operation.
 * @apiError 409 Email already registered.
 **/
router.post('/register', master(), actions.create);

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission basic
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {User} user Current user's data.
 * @apiError 401 Invalid credentials.
 **/
router.post('/', password(), login);

/**
 * @api {get} /auth/renewJWT Renew JWT
 * @apiName Renew JWT
 * @apiGroup Auth
 * @apiPermission token
 * @apiParam {String} access_token access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {User} user Current user's data.
 * @apiError 401 Invalid token.
 **/
router.get('/renewJWT', token({ required: true }), login);

export default router;
