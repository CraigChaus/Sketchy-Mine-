import { StatusCodes } from 'http-status-codes';
import { getTokenFromRequest, verifyToken } from './is_logged_in';

const isModerator = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (token) {
    const payload = await verifyToken(token);

    if (payload.is_moderator) {
      return next();
    }
  }

  res
    .status(StatusCodes.UNAUTHORIZED)
    .send('You need to be a moderator to do this!');
};

export default isModerator;
