const express = require('express');
const { userController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post(
  '/signup',
  AuthRequestMiddlewares.validateAuthRequest,
  userController.signup
);
router.post(
  '/signin',
  AuthRequestMiddlewares.validateAuthRequest,
  userController.signin
);
router.post(
  '/role',
  AuthRequestMiddlewares.checkAuth,
  AuthRequestMiddlewares.isAdmin,
  userController.addRoleToUser
);

module.exports = router;
