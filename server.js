if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const cors = require('cors');
const apiRouter = require('./routers/api');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var config = require('./config');
var db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(cors());  
app.use(bodyParser.json());
app.use('/api', apiRouter);

module.exports = app;
