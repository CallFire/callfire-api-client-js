import CallfireClient from '../../src/callfire-api-client-js';

describe('CallfireClient', () => {
  it('getAccount and sendText', () => {
    let client = new CallfireClient('login', 'password', {debug: true});

    client.ready().then((client) => {
      client.me.getAccount({responseContentType: 'application/json'},
        (response) => {
          console.log('account', response.obj);
        },
        (err) => {
          throw Error(err);
        });

      client.texts.sendTexts(
        [{
          phoneNumber: '16505754427',
          message: 'test1'
        }],
        {requestContentType: 'application/json', responseContentType: 'application/json'},
        (response) => {
          console.log('account', response.obj);
        },
        (err) => {
          throw Error(err + err.data);
        });
    })
  });
});
