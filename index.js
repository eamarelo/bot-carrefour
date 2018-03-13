const request = require('request');
const appCredentials = {
  'id_client': '98cc4890-9c5b-4a9c-b2d9-3c9fdf7c4c18',
  'secret': 'C1yD0eY7sT2yL8sJ4yR4tX5fW7eP7tV1dC6qA7fX4aU1gQ8oX8'
};

module.exports = class Botcarrefour {
  constructor (lng, lat) {
    this.lng = lng;
    this.lat = lat;
  }

  init (callback) {
    var options = {
      'method': 'GET',
      'url': 'https://api.fr.carrefour.io/v1/openapi/stores',
      'qs': {
        'longitude': this.lng,
        'latitude': this.lat,
        'radius': '5000'
      },
      'headers': {
        'accept': 'application/json',
        'x-ibm-client-secret': appCredentials.secret,
        'x-ibm-client-id': appCredentials.id_client
      }
    };

    request(options, (error, response, body) => {
      if (error) {
        return console.error('Failed: %s', error.message);
      }

      console.log('succes ' + body);
      callback(body);
      return body;
    });
  }

  echo () {
    var sync = true;

    this.init(result => {
      this.setJson(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  setJson (json) {
    this.json = JSON.parse(json);
  }

  getJson () {
    return this.json;
  }
};

