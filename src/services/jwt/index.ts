import jwt from 'jsonwebtoken';
import config from '../../config';
import { Promise } from 'bluebird';

const { jwtSecret } = config;

const jwtSign: any = Promise.promisify(jwt.sign);
const jwtVerify: any = Promise.promisify(jwt.verify);

export const sign = (id: any, options?: any) => jwtSign({ id }, jwtSecret, options);
export const signSync = (id: any, options: any) => sign(id, options);
export const verify = (token: string) => jwtVerify(token, jwtSecret);
