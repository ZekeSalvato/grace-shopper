const express = require('express');
const jwt = require('jsonwebtoken');



const usersRouter = express.Router();

const { createUser, getUser, getUserByUsername, getUserById, fetchAllUsers} = require('../db/users')

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

//need to put correct component links
usersRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            next({
                name: "UserExistsError",
                message: "A user by that username already exists"
            });
        }
        const user = await createUser({
            username, password
        })

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '1W'
        })
        res.send({
            message: "Thank you for signing up!",
            token
        })
    } catch (error) {
        console.log("Failed to make account")
        throw error
    }
})

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    try {
          const user = await createUser({ username, password });
          if (user) {
            const token = jwt.sign(user, JWT_SECRET);
            res.send({
              name: 'RegisterSuccess',
              message: "you're logged in!",
              token,
              user,
            });
          }
        }catch ({ name, message }) {
            next({ name, message });
    }
  });

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next({
            name: 'MissingCredentialsError',
            message: "Please supply both a username and password"
        });
    }
    try {
        const user = await getUserByUsername(username);
        if (user && user.password == password) {
            res.send({ message: "you're logged in!", token });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = usersRouter;