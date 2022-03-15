const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const verifyToken = (token) => {
  try {
    const tokenPayload = jwt.decode(token);

    if (tokenPayload) {
      const user = users.find((foundUser) => foundUser.username === tokenPayload.username);
      return jwt.verify(token, user.secret);
    }
    return false;
  } catch (e) {
    return false;
  }
};

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    return authHeader.split(' ')[1];
  }

  return false;
};

const isLoggedIn = (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      req.user = payload;
      return next();
    }
    return false;
  }
  res.status(StatusCodes.UNAUTHORIZED).send('Something is wrong with your credentials.');

  return false;
};

module.exports = isLoggedIn;
