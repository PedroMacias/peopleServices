const express = require('express');
const app = express();
const request = require('request')
const Promise = require('bluebird')

const apiURL = 'http://www.omdbapi.com/'
const callGet = Promise.promisify(request.get)

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
        res.send({SC: response.statusCode,
          Pedro: 'puto',
          Actores: response.body.Actors.split(',').map(name => ({nombre: name}))
        })
      })
});


app.get('/pedrito/:title', (req, res) => {
  const result = require('./sample.json');
  result.Title = req.params.title
  res.send(result);
});

app.get('/pedrito2/:param', (req, res) => {
  res.status(201).send({ ok: req.params.param });
});

console.log("Listening port 8080")
app.listen(8080);
