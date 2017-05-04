exports.wikipediaOptions = {
  url: 'https://en.wikipedia.org/w/api.php',
  qs: {
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintro: '',
    explaintext: ''
  },
  json: true
};

exports.omdbApiOptions = {
  url: 'http://www.omdbapi.com/',
  qs: {
    t: ''
  },
  json: true
};
