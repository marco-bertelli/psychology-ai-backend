import { sign } from '../../services/jwt/index';

export const login = ({ user }: any, res: any, next: any) => sign(user.id)
  .then(async (token: any) => await Promise.all([token, user]))
  .then(([token, userView]: any) => res.send({
    token,
    user: userView
  }));