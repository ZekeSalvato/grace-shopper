const express = require('express');

const cartRouter = express.Router();

cartRouter.get('/', (req, res, next) => {
  res.send('Cart')
})

module.exports = cartRouter;