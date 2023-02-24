const Router = require('express');

const router = new Router();
const userRouter = require('./userRouter');
const todoItemRouter = require('./todoItemRouter');

router.use('/user', userRouter);
router.use('/todo', todoItemRouter);

module.exports = router;
