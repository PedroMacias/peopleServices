'use strict';

const client = require('../delegate/rest-client')
const constants = require('../endpoint/constants.js')
const delegate = require('../delegate/movie-delegate')

module.exports.JsonGetAll = function(req, res) {
  console.log("GET json");
  res
    .status(200)
    .json({"jsonData " : true})
};

module.exports.ActorsGetAll = function(req, res){
  console.log("GET actor");
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
  };
