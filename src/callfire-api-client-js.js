'use strict';

const Swagger = require('swagger-client');

/**
 * Construct API client for CallFire API v2
 *
 * @param {string} login - API login
 * @param {string} password - API password
 * @param {Object} options - client options. debug: true - enables additional logging
 *
 * @returns {CallfireClient}
 *
 * <b>Authentication:</b> the CallFire API V2 uses HTTP Basic Authentication to verify
 * the user of an endpoint. A generated username/password API credential from your
 * account settings is required.
 * </p>
 * <b>Errors:</b> codes in the 400s range detail all of the errors a CallFire Developer could
 * encounter while using the API. Bad Request, Rate Limit Reached, and Unauthorized
 * are some of the sorts of responses in the 400s block. Codes in the 500s range are
 * error responses from the CallFire system. If an error has occurred anywhere in
 * the execution of a resource that was not due to user input, a 500 response
 * will be returned with a corresponding JSON error body. In that body will contain a message
 * detailing what went wrong.
 * API may return following response codes:
 * <ul>
 * <li>400 - Bad request, the request was formatted improperly.</li>
 * <li>401 - Unauthorized, API Key missing or invalid.</li>
 * <li>403 - Forbidden, insufficient permissions.</li>
 * <li>404 - NOT FOUND, the resource requested does not exist.</li>
 * <li>500 - Internal Server Error.</li>
 * </ul>
 *
 * @author Vladimir Mikhailov (email: vmikhailov@callfire.com)
 * @see <a href="https://developers.callfire.com/docs.html">Callfire API documentation</a>
 * @see <a href="https://developers.callfire.com/learn.html">HowTos and examples</a>
 * @see <a href="http://stackoverflow.com/questions/tagged/callfire">Stackoverflow community questions</a>
 * @since 0.0.1
 */
class CallfireClient {

  constructor(login, password, options) {
    Object.assign(this, options || {});
    CallfireClient.validateCredentials(login, password);

    this.swaggerClient = new Swagger({
      url: CallfireClient.swaggerUrl(),
      authorizations: {
        basicAuth: new Swagger.PasswordAuthorization(login, password),
      },
      usePromise: true
    });
  }

  /**
   * Method instantiates API client and connects to swagger-enabled API
   *
   * @return {Swagger}
   */
  ready(resolve, reject) {
    this.swaggerClient.then((client) => {
      Object.assign(this, client.apis || {});
      resolve(client);
    })
      .catch((error) => {
        reject(error)
      });
  }

  /**
   * Validates API credentials
   *
   * @param login API login
   * @param password API password
   */
  static validateCredentials(login, password) {
    if (login == 'undefined' || login == null || password == 'undefined' || password == null) {
      throw new Error('API credentials cannot be empty.');
    }
  }

  /**
   * Returns base API path
   *
   * @return {string}
   */
  static basePath() {
    return 'https://api.callfire.com/v2/';
  }

  /**
   * Returns path to Swagger spec
   *
   * @return {string}
   */
  static swaggerUrl() {
    return CallfireClient.basePath() + 'api-docs/swagger.json';
  }
}

exports = module.exports = CallfireClient;
