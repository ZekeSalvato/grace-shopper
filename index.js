require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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

const apiRouter = require('./api');
server.use('/api', apiRouter);

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