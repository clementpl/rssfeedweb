let assert = chai.assert;
let testFolder = "./test/testData/"
let ajax = require('../src/js/ajax');

describe('listFlux', () => {
  describe('get list flux', () => {
    it('should get a list of length 2', function() {
      ajax.getListFlux((list) => {
        assert.equal(list.length, 2);
      }, `${testFolder}/feeds.json`);
    });

    it('should get a list of length 2', function() {
      ajax.getListFlux((list) => {
        assert.equal(list.length, 2);
      }, `${testFolder}/feeds.json`);
    });

    it('should get a list of length 2', function() {
      ajax.getListFlux((list) => {
        assert.equal(list.length, 2);
      }, `${testFolder}/feeds.json`);
    });
  });
});
