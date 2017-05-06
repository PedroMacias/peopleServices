'use strict';

const client = require('../delegate/rest-client')
const constants = require('./constants.js')
const delegate = require('../delegate/movie-delegate')
const express = require('express')
const routes = require('../routes/routes-index.js')
const path = require('path')

const app = express();

app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, '../../public')));
app.use("/api", routes);


console.log('\x1b[42m\x1b[30m\x1b[5m%s\x1b[0m', `---------- Listening port ${constants.PORT}... ----------`)
app.listen(constants.PORT);
