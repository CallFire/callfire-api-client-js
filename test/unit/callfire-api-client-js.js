import CallfireApiClient from '../../src/callfire-api-client-js';

describe('CallfireApiClient', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(CallfireApiClient, 'greet');
      CallfireApiClient.greet();
    });

    it('should have been run once', () => {
      expect(CallfireApiClient.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(CallfireApiClient.greet).to.have.always.returned('hello');
    });
  });
});
