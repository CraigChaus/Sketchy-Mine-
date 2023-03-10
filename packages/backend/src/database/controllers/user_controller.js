import { Op } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from './models/user_model';

/* Create and Save a new USER */
export const create = async (req, res) => {
  /* Validate request */
  const { username } = req.body;
  const { password } = req.body;
  if (!(username && password)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: 'Content can not be empty!',
      });
    return;
  }

  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: 'User already registered!',
      });
    return;
  }

  /* Create a USER */
  const user = {
    username,
    password: await bcrypt.hash(password, 12),
    secret: uuidv4(),
  };

  /* Save USER in the database */
  User.create(user)
    .then((u) => {
      res
        .status(StatusCodes.CREATED)
        .send({
          id: u.id,
          username: u.username,
          is_moderator: u.is_moderator,
          total_emeralds: u.total_emeralds,
        });
    })
    .catch((err) => {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({
          message:
                err.message
              || 'Please fill in username/password',
        });
    });
};

/* Retrieve all Users from the database. */
export const findAll = (req, res) => {
  const { username } = req.query;
  const condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition, order: [['total_emeralds', 'DESC']] })
    .then((data) => {
      res
        .send(data);
    })
    .catch((err) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          message:
            err.message,
        });
    });
};

/* Find a single User with an id */
export const findById = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({
            message: `User with id ${id} not found.`,
          });
      }
    })
    .catch((err) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          message:
            err.message
              || `Error retrieving User with id ${id}`,
        });
    });
};

/* Update a User by the id in the request. */
export const update = (req, res) => {
  const { id } = req.params;
  User.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num.length === 1) {
        res
          .status(StatusCodes.OK)
          .send({
            message: 'User was updated successfully.',
          });
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({
            message: `Cannot update User with id ${id}. User was not found or req.body is empty!`,
          });
      }
    })
    .catch((err) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          message:
              err.message
              || `Error updating User with id ${id}`,
        });
    });
};

/* Delete a User with the specified id in the request. */
export const deleteUser = (req, res) => {
  const { id } = req.params;
  User.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res
          .status(StatusCodes.OK)
          .send({
            message: 'User was deleted successfully!',
          });
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({
            message: `Cannot delete User with id ${id}. User was not found!`,
          });
      }
    })
    .catch((err) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          message:
              err.message
              || `Could not delete User with id ${id}`,
        });
    });
};
