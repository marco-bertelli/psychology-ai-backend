import { User } from './model';
import * as _ from 'lodash';

const actions: any = {};

actions.index = async function ({ querymen: { query, cursor } }: any, res: any) {
  const results = await User.find(query).skip(cursor.skip).limit(cursor.limit).sort(cursor.sort);
  const count = await User.countDocuments(query);

  res.set('Odin-Count', count);
  res.send(results);
};

actions.show = async function ({ params: { id } }: any, res: any) {
  const user = await User.findById(id).populate('survey').exec();

  if (!user) {
    return res.status(404).send();
  }

  res.send(user);
};

actions.showMe = ({ user }: any, res: any) => res.send(user);

actions.create = async ({ body }: any, res: any) => {
  let user;
  try {
    user = await User.create(body)
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).send({
        valid: false,
        param: 'email - username',
        message: 'email or username already registered'
      });
    }
  }

  res.send(user);
};

actions.update = ({ body, params, user }: any, res: any, next: any) => User.findById(params.id === 'me' ? user.id : params.id)
  .then(result => {
    if (body) {
      delete body.password;
    }

    if (!result) {
      return null;
    }

    const isAdmin = user.role === 'admin';
    const isSelfUpdate = user.id === result.id;
    if (!isSelfUpdate && !isAdmin) {
      res.status(401).json({
        valid: false,
        message: 'You can\'t change other user\'s data'
      });
      return null;
    }
    return result;
  })
  .then(async (user: any) => {
    if (!user) {
      return null;
    }

    for (const key in body) {
      if (
        !_.isUndefined(body[key]) &&
        user[key] !== body[key]
      ) {
        user[key] = null;
        user[key] = body[key];
        user.markModified(key);
      }
    }
    await user.save();

    res.send(user)
  });

actions.updatePassword = ({ body, params, user }: any, res: any, next: any) => User.findById(params.id === 'me' ? user.id : params.id)
  .then(result => {
    if (!result) {
      return null;
    }

    const isSelfUpdate = user.id === result.id;
    if (!isSelfUpdate && user.role !== 'admin') {
      res.status(401).json({
        valid: false,
        param: 'password',
        message: 'You can\'t change other user\'s password'
      });
      return null;
    }
    return result;
  })
  .then(user => (user ? user.set({ password: body.password }).save() : null))
  .then(user => res.send(user))


actions.deleteMe = async function ({ user }: any, res: any) {
  if (_.isNil(user)) {
    return res.status(404).send();
  }

  if (user.isDeleted) {
    return res.status(400).send({ message: 'current user is already deleted' });
  }

  const obliteratedUser = await user.obliterateFields();
  res.status(200).send(obliteratedUser);
};

actions.destroy = async function ({ params: { id } }: any, res: any) {
  const user = await User.findById(id);

  if (_.isNil(user)) {
    return res.status(404).send();
  }

  await user.delete();

  res.status(204).send();
};

export { actions };
