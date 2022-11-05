const express = require('express');

const usersRouter = express.Router();

// const { getUser } = require('../db')

usersRouter.get('/',  (req, res, next) => {
   

  res.send('LIST OF USERS')
})

module.exports = usersRouter;