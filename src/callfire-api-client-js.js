'use strict';

var Swagger = require('swagger-client');

console.log('init.');


// ------------------------------------------------------------------------------------------

class CallfireClient {
  constructor() {
    this._swaggerUrl = 'https://api.callfire.com/v2/api-docs/swagger.json';
    this._swaggerClient = new Swagger({
      url: this._swaggerUrl,
      authorizations: {
        basicAuth: new Swagger.PasswordAuthorization('login', 'password'),
      },
      success: function () {
        console.log("init swagger client - ok.");
        client.api().me.getAccount({responseContentType: 'application/json'}, function (account) {
          console.log('account', account);
        });
      },
      failure: function (err) {
        console.log("failed to initialize swagger client: " + err);
      }
    });
  }

  api() {
    return this._swaggerClient;
  }

  static basePath() {
    return 'https:/api.callfire.com/v2/';
  }


}

export default CallfireClient;

let client = new CallfireClient();

console.log(CallfireClient.basePath());
