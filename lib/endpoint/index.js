const express = require('express');
const app = express();

app.get('/pedrito', (req, res) => {
  const result = require('./sample.json');
  res.send(result);
});

app.get('/pedrito2/:param', (req, res) => {
  res.status(201).send({ ok: req.params.param });
});

app.listen(8080);
