'use strict';

const constants = require('../endpoint/constants.js')
const ctrlCastores = require('../controllers/castores.controlers.js')
const express = require('express');
const router = express.Router();


router
  .route(constants.JSON_ENDPOINT)
  .get(ctrlCastores.JsonGetAll);

router
.route(constants.ACTOR_ENDPOINT)
.get(ctrlCastores.ActorsGetAll);



module.exports = router;
