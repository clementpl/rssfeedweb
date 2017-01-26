let assert = chai.assert;
let expect = chai.expect;
let testFolder = "./test/testData/";
let ajax = require('../src/js/ajax');
let flux = require('../src/js/flux');

describe('Ajax', () => {
    describe('get list flux', () => {
        it('should get a list of length 2', function(done) {
            ajax.getListFlux((list) => {
                assert.equal(list.length, 2);
                done();
            }, `${testFolder}feeds.json`);
        });
        it('should get an object with the following properties', function(done) {
            ajax.getListFlux((list) => {
                let l = list[0];
                expect(l).to.have.property('id');
                expect(l).to.have.property('title');
                expect(l).to.have.property('unknow');
                expect(l).to.have.property('description');
                expect(l).to.have.property('date');
                done();
            }, `${testFolder}feeds.json`);
        });
        it('should get an object with 5 properties', function(done) {
            ajax.getListFlux((list) => {
                assert.equal(Object.keys(list[0]).length, 5);
                done();
            }, `${testFolder}feeds.json`);
        });
    });

    describe('get flux', () => {
        it('should get a xml file', function(done) {
            ajax.getFlux(11, (flux) => {
                assert.equal($.isXMLDoc(flux), true);
                done();
            }, `${testFolder}feed/`);
        });
    });
});

describe('Flux', () => {
    describe('create flux', () => {
        it('should create a new flux with 26 item', function(done) {
            ajax.getFlux(11, (xml) => {
                let f = new flux();
                f.init(xml);
                assert.equal($(".item").length, 26);
                done();
            }, `${testFolder}feed/`);
        });
    });
});
