'use strict';

const express = require('express');
const app = express();
const request = require('request')
const Promise = require('bluebird')

const apiURL = 'http://www.omdbapi.com/'
const callGet = Promise.promisify(request.get)

const wikipediaOptions = {
  url: 'https://en.wikipedia.org/w/api.php',
  qs: {
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintro: '',
    explaintext: ''
  },
  json: true
}

app.get('/peliculas/:title', (req, res) => {

  const options = {
    url: apiURL,
    qs: {
      t: req.params.title
    },
    json: true
  }
  callGet(options).then(response => {
    res.send(response.body)
  })
});

app.get('/Actors/:movie', (req, res) => {
  const options = {
    url: apiURL,
    qs: {
      t: req.params.movie
    },
    json: true
  }
  callGet(options).then(response => {
    const actors = response.body.Actors.split(',');
    Promise.all(actors.map(name => {
        wikipediaOptions.qs.titles = name;
        return callGet(wikipediaOptions);
      }))
      .then(actorBios => {
        let result = {
          SC: response.statusCode,
          Pedro: 'puto',
          Actores: actorBios.map(elem => {
            const pagesObject = elem.body.query.pages;
            const name = pagesObject[Object.keys(pagesObject)[0]].title;
            const bio = pagesObject[Object.keys(pagesObject)[0]].extract;
            return {
              nombre: name,
              biografia: bio
            };
          })
        }
        res.send(result);
      })
  })
});


app.get('/pedrito/:title', (req, res) => {
  const result = require('./sample.json');
  result.Title = req.params.title
  res.send(result);
});

app.get('/pedrito2/:param', (req, res) => {
  res.status(201).send({
    ok: req.params.param
  });
});

console.log("Listening port 8080")
app.listen(8080);
