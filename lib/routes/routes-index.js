'use strict';

const client = require('../delegate/rest-client')
const constants = require('../endpoint/constants.js')
const delegate = require('../delegate/movie-delegate')
const express = require('express');
const router = express.Router();


router
  .route('/json')
  .get((req, res) => {
    console.log("GET json");
    res
      .status(200)
      .json({"jsonData " : true})
  })
  .post((req, res) => {
    console.log("POST the json route");
    res
      .status(200)
      .json({"jsonData " : "POST received"})
  });

router
.route(constants.ACTOR_ENDPOINT)
.get((req, res) => {
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



module.exports = router;
