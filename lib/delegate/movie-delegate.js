'use strict'

const constants = require('./constants')

function createActor(actorBio) {
  const pagesObject = actorBio.body.query.pages;
  const name = pagesObject[Object.keys(pagesObject)[0]].title;
  const bio = pagesObject[Object.keys(pagesObject)[0]].extract;
  return {
    nombre: name,
    biografia: bio
  };
}

function createWikipediaOptions(name) {
  let result = constants.wikipediaOptions;
  result.qs.titles = name;
  return result;
}

function createOmdbOptions(movieTitle) {
  let result = constants.omdbApiOptions;
  result.qs.t = movieTitle;
  return result;
}


module.exports = {
  createActor,
  createWikipediaOptions,
  createOmdbOptions
};
