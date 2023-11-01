const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/UserController');

userRouter.route('/')
  .post(UserController.createUser)
  .get(UserController.getUsers);

userRouter.route('/:user_id')
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = userRouter;
