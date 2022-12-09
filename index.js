const {getUserById} = require('./db/users')
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const server = express();
const PORT = 3000;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// const path = require('path');
// server.use(express.static(path.join(__dirname, 'build')));

// server.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const { client } = require('./db');

server.use((req, res, next) => {
  console.log('Hitting server')
  next();
})

// set `req.user` if possible
server.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

server.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

apiRouter.use((error, req, res, next) => {
    
  res.send({
    error: error.error,
    name: error.name,
    message: error.message
  });
});

server.listen(PORT, async () => {
  console.log(`Server is up and running on port ${PORT}`)
  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});


//test push from Scout,,