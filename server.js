if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const cors = require('cors');
const apiRouter = require('./routers/api');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(cors());  
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use('/', (req, res) => res.status(200).sendFile(__dirname + '/index.html'));

module.exports = app;
