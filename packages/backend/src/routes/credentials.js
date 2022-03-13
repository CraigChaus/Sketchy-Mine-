const express = require('express');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const router = express.Router();

const login = (username, password) => {
  if (username && password) {
    const user = users.find((foundUser) => foundUser.username === username);
    if (user) {
      const result = bcrypt.compareSync(password, user.password);
      if (result) {
        return jwt.sign({
          id: user.id,
          username: user.username,
          roles: user.roles,
        }, user.secret);
      }
    }
    return false;
  }
  return false;
};

router.post('', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const token = login(username, password);
    if (token) {
      res.send({ token, user: jwt.decode(token) });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send('Username and/or password incorrect!');
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).send('Required parameter missing!');
  }
});

module.exports = router;
