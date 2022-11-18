const express = require('express');

const apiRouter = express.Router();

const usersRouter = require('./usersRouter');
apiRouter.use('/users', usersRouter)

const productsRouter = require('./productsRouter');
apiRouter.use('/products', productsRouter);

const cartRouter = require('./cartRouter');
apiRouter.use('/cart', cartRouter);




module.exports = apiRouter;
