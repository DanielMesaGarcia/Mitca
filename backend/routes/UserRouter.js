const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/UserController');

userRouter.route('/')
  .post(UserController.createUser)
  .get(UserController.getUsers);
  
userRouter.route('/:_id')
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

  userRouter.route('/login').post(UserController.login);
module.exports = userRouter;
