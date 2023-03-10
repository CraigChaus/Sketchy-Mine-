import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../database/controllers/models/user_model';

export const verifyToken = async (token) => {
  try {
    const tokenPayload = jwt.decode(token);

    if (tokenPayload) {
      const user = await User.findOne({ where: { username: tokenPayload.username } });
      return jwt.verify(token, user.secret);
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    return authHeader.split(' ')[1];
  }
  return false;
};

const isLoggedIn = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (token) {
    const payload = await verifyToken(token);

    if (payload) {
      req.user = payload;
      return next();
    }
  }
  res.status(StatusCodes.UNAUTHORIZED).send('Something is wrong with your credentials.');

  return false;
};

export default isLoggedIn;
