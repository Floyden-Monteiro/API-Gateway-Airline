const express = require('express');

const router = express.Router();
const { infoController } = require('../../controllers');
const userRouter = require('./user-routes');

router.get('/info', infoController);
router.use('/user',userRouter);

module.exports = router;
