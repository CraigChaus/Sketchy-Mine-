import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from './models/user_model';

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (user) {
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      return jwt.sign({
        id: user.id,
        username: user.username,
        total_emeralds: user.total_emeralds,
        is_moderator: user.is_moderator,
      }, user.secret);
    }
  }
  return false;
};

const create = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const token = await login(username, password);
    if (token) {
      res
        .status(StatusCodes.OK)
        .send({ token, user: jwt.decode(token) });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send('Username and/or password incorrect!');
    }
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send('Required parameter missing!');
  }
};

export default create;
