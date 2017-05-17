'use strict';

const client = require('../delegate/rest-client')
const constants = require('../endpoint/constants.js')
const delegate = require('../delegate/movie-delegate')
const hotelData = require('../data/hotel-data.json')

module.exports.HotelGetAll = function(req, res) {
  console.log("GET Hotels");
  console.log(req.query);

  let offset = 0;
  let count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10)
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10)
  }

  let returnData = hotelData.slice(offset,offset + count)

  res
    .status(200)
    .json(returnData)
};

module.exports.HotelGetOne = function(req, res) {
  let hotelId = req.params.hotelId
  let thisHotel = hotelData[hotelId]
  console.log("GET HotelId ", hotelId);
  res
    .status(200)
    .json(thisHotel)
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
