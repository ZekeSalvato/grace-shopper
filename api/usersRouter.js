const express = require('express');
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
const { createUser, loginUser, getUser, getUserByUsername, getUserById, checkIfUserExists, fetchAllUsers} = require('../db/users')
const {JWT_SECRET} = process.env;

usersRouter.get('/', async (req, res, next) => {
    try {
      console.log("await getallusers()")
      const users = await fetchAllUsers();
      console.log(users)
      res.send(users)
    }
    catch (error) {
      console.log(error)
      throw error
    }
})

usersRouter.get('/me', requireUser, async (req, res, next) => {
    try{
    const user = req.user;
    res.send(user)
    } catch (error) {
        console.log(error)
        throw error;
    }
})

usersRouter.post('/register', async (req, res, next) => {
    try {
      const { username, password, isAdmin } = req.body;
      const checkUser = await checkIfUserExists(username);
      console.log(checkUser);
      if (checkUser && checkUser.username === username) {
        res.status(500).send({
          name: 'Username Taken',
          message: 'UsernameTakenError',
          error: 'UsernameTakenError',
        });
      } else {
        const user = await createUser({username, password, isAdmin});
        const token = jwt.sign({ 
            id: user.id,
            username
         }, `${JWT_SECRET}`)
        res.send({ name: 'RegisterSuccess', message: 'Successfully registered', user, token});
      }
    } catch (error) {
      console.error('API register error');
      next(error);
    }
  });

  usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      res.send({
        name: 'MissingCredentialsError',
        message: 'Please supply both a username and password'
      });
    }
  
    try {
      const user = await getUser({username, password});
      if(!user) {
        res.send({
          name: 'IncorrectCredentialsError',
          message: 'Username or password is incorrect',
        })
      } else {
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
        res.send({ user, message: "you're logged in!", token });
      }
    } catch (error) {
      next(error);
    }
  });
  


module.exports = usersRouter;