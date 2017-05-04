'use strict'

const request = require('request')
const Promise = require('bluebird')
const callGet = Promise.promisify(request.get)

module.exports = {
  GET: callGet
}
