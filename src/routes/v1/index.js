const express = require('express');
const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();
const { infoController } = require('../../controllers');
const userRouter = require('./user-routes');

router.get('/info', AuthRequestMiddlewares.checkAuth, infoController);
router.use('/user', userRouter);

module.exports = router;
