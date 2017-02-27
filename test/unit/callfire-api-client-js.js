import CallfireClient from '../../src/callfire-api-client-js';

describe('CallfireClient', () => {
  let login = '...';
  let password = '...';

  it('getAccount', () => {
    let client = new CallfireClient(login, password, {debug: true});

    client.ready().then((client) => {
      client.me.getAccount()
        .then((response) => {
          console.log('account', response.obj);
        })
        .catch((err) => {
          throw Error(err + err.data);
        });
    })
  });

  it('sendTexts', () => {
    let client = new CallfireClient(login, password);

    client.ready().then((client) => {
      client.texts.sendTexts({
        body: [
          {
            phoneNumber: '14243876936',
            message: 'test message 1'
          },
          {
            phoneNumber: '14243876936',
            message: 'test message 2'
          }
        ]
      })
        .then((response) => {
          console.log('texts', response.obj);
        })
        .catch((err) => {
          throw Error(err + err.data);
        });
    })
  });
});
