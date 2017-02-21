'use strict';

const Swagger = require('swagger-client');

let _login = null;
let _password = null;

/**
 *
 */
class CallfireClient {

  constructor(login, password, options) {
    Object.assign(this, options || {});
    CallfireClient.validateCredentials(login, password);
    _login = login;
    _password = password;
  }

  ready() {

    return new Promise((resolve, reject) => {
      const swaggerClient = new Swagger({
        url: CallfireClient.swaggerUrl(),
        authorizations: {
          basicAuth: new Swagger.PasswordAuthorization(_login, _password),
        },
        success: () => {
          this.swaggerClient = swaggerClient;
          resolve(this);
          Object.assign(this, swaggerClient.apis || {});
        },
        failure: (err) => {
          throw new Error('failed to initialize swagger client:' + err);
        }
      });
    });
  }

  static validateCredentials(login, password) {
    if (login == 'undefined' || login == null || password == 'undefined' || password == null) {
      throw new Error('API credentials cannot be empty.');
    }
  }

  static basePath() {
    return 'https:/api.callfire.com/v2/';
  }

  static swaggerUrl() {
    return CallfireClient.basePath() + 'api-docs/swagger.json';
  }
}

// ----------------------------------------------------------------

module.exports = CallfireClient;
