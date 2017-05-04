'use strict';

const express = require('express');
const app = express();
const delegate = require('../delegate/movie-delegate')
const client = require('../delegate/rest-client')
const constants = require('./constants.js')

app.get(constants.ACTOR_ENDPOINT, (req, res) => {
  client.GET(delegate.createOmdbOptions(req.params.movie))
  .then(response => {
    const actors = response.body.Actors.split(',');
    Promise.all(actors.map(name => client.GET(delegate.createWikipediaOptions(name))))
    .then(actorBios => {
      let result = {
        SC: response.statusCode,
        Pedro: 'puto',
        Actores: actorBios.map(delegate.createActor)
      }
      res.send(result);
    })
  })
});

console.log('\x1b[42m\x1b[30m\x1b[5m%s\x1b[0m', `---------- Listening port ${constants.PORT}... ----------`)
app.listen(constants.PORT);
