import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import passport from '../../lib/auth/passport';
import User from './models/user_model';

export const createToken = async (username) => {
  const user = await User.findOne({ where: { username } });
  if (user) {
    return jwt.sign({
      id: user.id,
      username: user.username,
      total_emeralds: user.total_emeralds,
      is_moderator: user.is_moderator,
    }, user.secret);
  }
  return false;
};

const authCallback = async (_, res, err, user) => {
  if (err || !user) {
    return res.status(400).json({
      message: 'Authentication error',
    });
  }

  const { username } = user;

  const token = await createToken(username);

  return res
    .status(StatusCodes.OK)
    .send({ token, user: jwt.decode(token) });
};

const createCredentials = async (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (...args) => authCallback(req, res, ...args),
  )(req, res, next);
};

export default createCredentials;
