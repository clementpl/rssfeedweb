(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.M = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var host = require('./host');

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, [{
    key: 'getFlux',
    value: function getFlux(id, callback) {
      var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : host + 'feed/';

      this.get('' + url + id, callback, 'xml');
    }
  }, {
    key: 'getListFlux',
    value: function getListFlux(callback) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : host + 'feeds.json';

      this.get(url, function (response) {
        var list = response.feeds || [];
        var listret = [];
        for (var i = 0; i < list.length; i++) {
          //[0] == id , [1] == title, [2] == ? [3] == description, [4] == date
          var l = list[i];
          listret.push({
            id: l[0],
            title: l[1],
            unknow: l[2],
            description: l[3],
            date: l[4]
          });
        }
        callback(listret);
      });
    }
  }, {
    key: 'post',
    value: function post(url, body, callback) {
      $.ajax({
        url: url,
        dataType: 'json',
        type: "POST",
        data: body,
        crossDomain: true,
        success: function success(response) {
          callback(response);
        },
        error: this.errorHandler
      });
    }
  }, {
    key: 'get',
    value: function get(url, callback) {
      var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'json';

      $.ajax({
        url: url,
        dataType: responseType,
        type: 'GET',
        crossDomain: true,
        success: function success(response) {
          callback(response);
        },
        error: this.errorHandler
      });
    }
  }, {
    key: 'errorHandler',
    value: function errorHandler(error) {
      console.log(error);
    }
  }]);

  return Ajax;
}();

module.exports = new Ajax();

},{"./host":3}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ajax = require('./ajax');

module.exports = function () {
    function Flux(id) {
        var _this = this;

        _classCallCheck(this, Flux);

        this.dom = $('#content');
        this.dom.html('');
        if (id) {
            ajax.getFlux(id, function (xml) {
                _this.xml = xml;
                _this.renderFlux();
            });
        }
    }

    _createClass(Flux, [{
        key: 'init',
        value: function init(xml) {
            this.xml = xml;
            this.renderFlux();
        }
    }, {
        key: 'renderFlux',
        value: function renderFlux() {
            var items = this.getItems();
            this.dom.append('<img src=' + this.getImage() + ' class="page-header"/>');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                this.dom.append('<div class="item row placeholders">\n                    <div class="col-xs-10 placeholder">\n                        <h4>' + item.title + '</h4>\n                        <span class="text-muted">' + item.description + '</span>\n                        <a target="_blank" href=' + item.link + '>Lire l\'article</a>\n                    </div>\n                </div>');
            }
        }
    }, {
        key: 'getTitle',
        value: function getTitle() {
            if (!this.title) this.title = this.xml.querySelector('title').textContent;
            return this.title;
        }
    }, {
        key: 'getImage',
        value: function getImage() {
            if (!this.image) this.image = this.xml.querySelector('image url').textContent;
            return this.image;
        }
    }, {
        key: 'getItems',
        value: function getItems() {
            if (!this.items) {
                this.items = [];
                var items = this.xml.getElementsByTagName('item');
                for (var i = 0; i < items.length; i++) {
                    this.items.push({
                        link: items[i].querySelector('link').textContent,
                        title: items[i].querySelector('title').textContent,
                        description: items[i].querySelector('description').textContent,
                        pubDate: items[i].querySelector('pubDate').textContent,
                        enclosure: items[i].querySelector('enclosure').getAttribute('url')
                    });
                }
            }
            return this.items;
        }
    }]);

    return Flux;
}();

},{"./ajax":1}],3:[function(require,module,exports){
'use strict';

module.exports = 'http://localhost:8000/example/';
//module.exports = 'http://qcloarec.com:8080/'

},{}],4:[function(require,module,exports){
'use strict';

var assert = chai.assert;
var expect = chai.expect;
var testFolder = "./test/testData/";
var ajax = require('../src/js/ajax');
var flux = require('../src/js/flux');

describe('Ajax', function () {
    describe('get list flux', function () {
        it('should get a list of length 2', function (done) {
            ajax.getListFlux(function (list) {
                assert.equal(list.length, 2);
                done();
            }, testFolder + 'feeds.json');
        });
        it('should get an object with the following properties', function (done) {
            ajax.getListFlux(function (list) {
                var l = list[0];
                expect(l).to.have.property('id');
                expect(l).to.have.property('title');
                expect(l).to.have.property('unknow');
                expect(l).to.have.property('description');
                expect(l).to.have.property('date');
                done();
            }, testFolder + 'feeds.json');
        });
        it('should get an object with 5 properties', function (done) {
            ajax.getListFlux(function (list) {
                assert.equal(Object.keys(list[0]).length, 5);
                done();
            }, testFolder + 'feeds.json');
        });
    });

    describe('get flux', function () {
        it('should get a xml file', function (done) {
            ajax.getFlux(11, function (flux) {
                assert.equal($.isXMLDoc(flux), true);
                done();
            }, testFolder + 'feed/');
        });
    });
});

describe('Flux', function () {
    describe('create flux', function () {
        it('should create a new flux with 26 item', function (done) {
            ajax.getFlux(11, function (xml) {
                var f = new flux();
                f.init(xml);
                assert.equal($(".item").length, 26);
                done();
            }, testFolder + 'feed/');
        });
    });
});

},{"../src/js/ajax":1,"../src/js/flux":2}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWpheC5qcyIsInNyYy9qcy9mbHV4LmpzIiwic3JjL2pzL2hvc3QuanMiLCJ0ZXN0L3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLE9BQU8sUUFBUSxRQUFSLENBQVg7O0lBRU0sSTtBQUNKLGtCQUFjO0FBQUE7QUFDYjs7Ozs0QkFFTyxFLEVBQUksUSxFQUE4QjtBQUFBLFVBQXBCLEdBQW9CLHVFQUFiLElBQWE7O0FBQ3hDLFdBQUssR0FBTCxNQUFZLEdBQVosR0FBa0IsRUFBbEIsRUFBd0IsUUFBeEIsRUFBa0MsS0FBbEM7QUFDRDs7O2dDQUVXLFEsRUFBbUM7QUFBQSxVQUF6QixHQUF5Qix1RUFBbEIsSUFBa0I7O0FBQzdDLFdBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxVQUFDLFFBQUQsRUFBYztBQUMxQixZQUFJLE9BQU8sU0FBUyxLQUFULElBQWtCLEVBQTdCO0FBQ0EsWUFBSSxVQUFVLEVBQWQ7QUFDQSxhQUFLLElBQUksSUFBRSxDQUFYLEVBQWMsSUFBRSxLQUFLLE1BQXJCLEVBQTZCLEdBQTdCLEVBQWtDO0FBQ2hDO0FBQ0EsY0FBSSxJQUFJLEtBQUssQ0FBTCxDQUFSO0FBQ0Esa0JBQVEsSUFBUixDQUFhO0FBQ1gsZ0JBQUksRUFBRSxDQUFGLENBRE87QUFFWCxtQkFBTyxFQUFFLENBQUYsQ0FGSTtBQUdYLG9CQUFRLEVBQUUsQ0FBRixDQUhHO0FBSVgseUJBQWEsRUFBRSxDQUFGLENBSkY7QUFLWCxrQkFBTSxFQUFFLENBQUY7QUFMSyxXQUFiO0FBT0Q7QUFDRCxpQkFBUyxPQUFUO0FBQ0QsT0FmRDtBQWdCRDs7O3lCQUVJLEcsRUFBSyxJLEVBQU0sUSxFQUFVO0FBQ3hCLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxHQURBO0FBRUwsa0JBQVUsTUFGTDtBQUdMLGNBQU0sTUFIRDtBQUlMLGNBQU0sSUFKRDtBQUtMLHFCQUFhLElBTFI7QUFNTCxpQkFBUyxpQkFBQyxRQUFELEVBQWM7QUFDckIsbUJBQVMsUUFBVDtBQUNELFNBUkk7QUFTTCxlQUFPLEtBQUs7QUFUUCxPQUFQO0FBV0Q7Ozt3QkFFRyxHLEVBQUssUSxFQUErQjtBQUFBLFVBQXJCLFlBQXFCLHVFQUFSLE1BQVE7O0FBQ3RDLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxHQURBO0FBRUwsa0JBQVUsWUFGTDtBQUdMLGNBQU0sS0FIRDtBQUlMLHFCQUFhLElBSlI7QUFLTCxpQkFBUyxpQkFBQyxRQUFELEVBQWM7QUFDckIsbUJBQVMsUUFBVDtBQUNELFNBUEk7QUFRTCxlQUFPLEtBQUs7QUFSUCxPQUFQO0FBVUQ7OztpQ0FFWSxLLEVBQU87QUFDbEIsY0FBUSxHQUFSLENBQVksS0FBWjtBQUNEOzs7Ozs7QUFHSCxPQUFPLE9BQVAsR0FBaUIsSUFBSSxJQUFKLEVBQWpCOzs7Ozs7Ozs7QUM3REEsSUFBSSxPQUFPLFFBQVEsUUFBUixDQUFYOztBQUVBLE9BQU8sT0FBUDtBQUNJLGtCQUFZLEVBQVosRUFBZ0I7QUFBQTs7QUFBQTs7QUFDWixhQUFLLEdBQUwsR0FBVyxFQUFFLFVBQUYsQ0FBWDtBQUNBLGFBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxFQUFkO0FBQ0EsWUFBSSxFQUFKLEVBQVE7QUFDSixpQkFBSyxPQUFMLENBQWEsRUFBYixFQUFpQixVQUFDLEdBQUQsRUFBUztBQUN0QixzQkFBSyxHQUFMLEdBQVcsR0FBWDtBQUNBLHNCQUFLLFVBQUw7QUFDSCxhQUhEO0FBSUg7QUFDSjs7QUFWTDtBQUFBO0FBQUEsNkJBWVMsR0FaVCxFQVljO0FBQ04saUJBQUssR0FBTCxHQUFXLEdBQVg7QUFDQSxpQkFBSyxVQUFMO0FBQ0g7QUFmTDtBQUFBO0FBQUEscUNBaUJpQjtBQUNULGdCQUFJLFFBQVEsS0FBSyxRQUFMLEVBQVo7QUFDQSxpQkFBSyxHQUFMLENBQVMsTUFBVCxlQUE0QixLQUFLLFFBQUwsRUFBNUI7QUFDQSxpQkFBSyxJQUFJLElBQUUsQ0FBWCxFQUFjLElBQUUsTUFBTSxNQUF0QixFQUE4QixHQUE5QixFQUFtQztBQUMvQixvQkFBSSxPQUFPLE1BQU0sQ0FBTixDQUFYO0FBQ0EscUJBQUssR0FBTCxDQUFTLE1BQVQsZ0lBR2tCLEtBQUssS0FIdkIsZ0VBSXVDLEtBQUssV0FKNUMsaUVBS3NDLEtBQUssSUFMM0M7QUFRSDtBQUNKO0FBL0JMO0FBQUE7QUFBQSxtQ0FpQ2U7QUFDUCxnQkFBSSxDQUFDLEtBQUssS0FBVixFQUNJLEtBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsV0FBN0M7QUFDSixtQkFBTyxLQUFLLEtBQVo7QUFDSDtBQXJDTDtBQUFBO0FBQUEsbUNBdUNlO0FBQ1AsZ0JBQUksQ0FBQyxLQUFLLEtBQVYsRUFDSSxLQUFLLEtBQUwsR0FBYSxLQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLFdBQWpEO0FBQ0osbUJBQU8sS0FBSyxLQUFaO0FBQ0g7QUEzQ0w7QUFBQTtBQUFBLG1DQTZDZTtBQUNQLGdCQUFJLENBQUMsS0FBSyxLQUFWLEVBQWlCO0FBQ2IscUJBQUssS0FBTCxHQUFhLEVBQWI7QUFDQSxvQkFBSSxRQUFRLEtBQUssR0FBTCxDQUFTLG9CQUFULENBQThCLE1BQTlCLENBQVo7QUFDQSxxQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDbkMseUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0I7QUFDWiw4QkFBTSxNQUFNLENBQU4sRUFBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLFdBRHpCO0FBRVosK0JBQU8sTUFBTSxDQUFOLEVBQVMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxXQUYzQjtBQUdaLHFDQUFhLE1BQU0sQ0FBTixFQUFTLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsV0FIdkM7QUFJWixpQ0FBUyxNQUFNLENBQU4sRUFBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLFdBSi9CO0FBS1osbUNBQVcsTUFBTSxDQUFOLEVBQVMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxZQUFwQyxDQUFpRCxLQUFqRDtBQUxDLHFCQUFoQjtBQU9IO0FBQ0o7QUFDRCxtQkFBTyxLQUFLLEtBQVo7QUFDSDtBQTVETDs7QUFBQTtBQUFBOzs7OztBQ0ZBLE9BQU8sT0FBUCxHQUFpQixnQ0FBakI7QUFDQTs7Ozs7QUNEQSxJQUFJLFNBQVMsS0FBSyxNQUFsQjtBQUNBLElBQUksU0FBUyxLQUFLLE1BQWxCO0FBQ0EsSUFBSSxhQUFhLGtCQUFqQjtBQUNBLElBQUksT0FBTyxRQUFRLGdCQUFSLENBQVg7QUFDQSxJQUFJLE9BQU8sUUFBUSxnQkFBUixDQUFYOztBQUVBLFNBQVMsTUFBVCxFQUFpQixZQUFNO0FBQ25CLGFBQVMsZUFBVCxFQUEwQixZQUFNO0FBQzVCLFdBQUcsK0JBQUgsRUFBb0MsVUFBUyxJQUFULEVBQWU7QUFDL0MsaUJBQUssV0FBTCxDQUFpQixVQUFDLElBQUQsRUFBVTtBQUN2Qix1QkFBTyxLQUFQLENBQWEsS0FBSyxNQUFsQixFQUEwQixDQUExQjtBQUNBO0FBQ0gsYUFIRCxFQUdNLFVBSE47QUFJSCxTQUxEO0FBTUEsV0FBRyxvREFBSCxFQUF5RCxVQUFTLElBQVQsRUFBZTtBQUNwRSxpQkFBSyxXQUFMLENBQWlCLFVBQUMsSUFBRCxFQUFVO0FBQ3ZCLG9CQUFJLElBQUksS0FBSyxDQUFMLENBQVI7QUFDQSx1QkFBTyxDQUFQLEVBQVUsRUFBVixDQUFhLElBQWIsQ0FBa0IsUUFBbEIsQ0FBMkIsSUFBM0I7QUFDQSx1QkFBTyxDQUFQLEVBQVUsRUFBVixDQUFhLElBQWIsQ0FBa0IsUUFBbEIsQ0FBMkIsT0FBM0I7QUFDQSx1QkFBTyxDQUFQLEVBQVUsRUFBVixDQUFhLElBQWIsQ0FBa0IsUUFBbEIsQ0FBMkIsUUFBM0I7QUFDQSx1QkFBTyxDQUFQLEVBQVUsRUFBVixDQUFhLElBQWIsQ0FBa0IsUUFBbEIsQ0FBMkIsYUFBM0I7QUFDQSx1QkFBTyxDQUFQLEVBQVUsRUFBVixDQUFhLElBQWIsQ0FBa0IsUUFBbEIsQ0FBMkIsTUFBM0I7QUFDQTtBQUNILGFBUkQsRUFRTSxVQVJOO0FBU0gsU0FWRDtBQVdBLFdBQUcsd0NBQUgsRUFBNkMsVUFBUyxJQUFULEVBQWU7QUFDeEQsaUJBQUssV0FBTCxDQUFpQixVQUFDLElBQUQsRUFBVTtBQUN2Qix1QkFBTyxLQUFQLENBQWEsT0FBTyxJQUFQLENBQVksS0FBSyxDQUFMLENBQVosRUFBcUIsTUFBbEMsRUFBMEMsQ0FBMUM7QUFDQTtBQUNILGFBSEQsRUFHTSxVQUhOO0FBSUgsU0FMRDtBQU1ILEtBeEJEOztBQTBCQSxhQUFTLFVBQVQsRUFBcUIsWUFBTTtBQUN2QixXQUFHLHVCQUFILEVBQTRCLFVBQVMsSUFBVCxFQUFlO0FBQ3ZDLGlCQUFLLE9BQUwsQ0FBYSxFQUFiLEVBQWlCLFVBQUMsSUFBRCxFQUFVO0FBQ3ZCLHVCQUFPLEtBQVAsQ0FBYSxFQUFFLFFBQUYsQ0FBVyxJQUFYLENBQWIsRUFBK0IsSUFBL0I7QUFDQTtBQUNILGFBSEQsRUFHTSxVQUhOO0FBSUgsU0FMRDtBQU1ILEtBUEQ7QUFRSCxDQW5DRDs7QUFxQ0EsU0FBUyxNQUFULEVBQWlCLFlBQU07QUFDbkIsYUFBUyxhQUFULEVBQXdCLFlBQU07QUFDMUIsV0FBRyx1Q0FBSCxFQUE0QyxVQUFTLElBQVQsRUFBZTtBQUN2RCxpQkFBSyxPQUFMLENBQWEsRUFBYixFQUFpQixVQUFDLEdBQUQsRUFBUztBQUN0QixvQkFBSSxJQUFJLElBQUksSUFBSixFQUFSO0FBQ0Esa0JBQUUsSUFBRixDQUFPLEdBQVA7QUFDQSx1QkFBTyxLQUFQLENBQWEsRUFBRSxPQUFGLEVBQVcsTUFBeEIsRUFBZ0MsRUFBaEM7QUFDQTtBQUNILGFBTEQsRUFLTSxVQUxOO0FBTUgsU0FQRDtBQVFILEtBVEQ7QUFVSCxDQVhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBob3N0ID0gcmVxdWlyZSgnLi9ob3N0Jyk7XG5cbmNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGdldEZsdXgoaWQsIGNhbGxiYWNrLCB1cmw9YCR7aG9zdH1mZWVkL2ApIHtcbiAgICB0aGlzLmdldChgJHt1cmx9JHtpZH1gLCBjYWxsYmFjaywgJ3htbCcpO1xuICB9XG5cbiAgZ2V0TGlzdEZsdXgoY2FsbGJhY2ssIHVybD1gJHtob3N0fWZlZWRzLmpzb25gKSB7XG4gICAgdGhpcy5nZXQodXJsLCAocmVzcG9uc2UpID0+IHtcbiAgICAgIGxldCBsaXN0ID0gcmVzcG9uc2UuZmVlZHMgfHwgW107XG4gICAgICBsZXQgbGlzdHJldCA9IFtdO1xuICAgICAgZm9yIChsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy9bMF0gPT0gaWQgLCBbMV0gPT0gdGl0bGUsIFsyXSA9PSA/IFszXSA9PSBkZXNjcmlwdGlvbiwgWzRdID09IGRhdGVcbiAgICAgICAgbGV0IGwgPSBsaXN0W2ldO1xuICAgICAgICBsaXN0cmV0LnB1c2goe1xuICAgICAgICAgIGlkOiBsWzBdLFxuICAgICAgICAgIHRpdGxlOiBsWzFdLFxuICAgICAgICAgIHVua25vdzogbFsyXSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbFszXSxcbiAgICAgICAgICBkYXRlOiBsWzRdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGxpc3RyZXQpXG4gICAgfSk7XG4gIH1cblxuICBwb3N0KHVybCwgYm9keSwgY2FsbGJhY2spIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICBkYXRhOiBib2R5LFxuICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICBzdWNjZXNzOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiB0aGlzLmVycm9ySGFuZGxlclxuICAgIH0pO1xuICB9XG5cbiAgZ2V0KHVybCwgY2FsbGJhY2ssIHJlc3BvbnNlVHlwZT0nanNvbicpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhVHlwZTogcmVzcG9uc2VUeXBlLFxuICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IHRoaXMuZXJyb3JIYW5kbGVyXG4gICAgfSk7XG4gIH1cblxuICBlcnJvckhhbmRsZXIoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQWpheCgpO1xuIiwibGV0IGFqYXggPSByZXF1aXJlKCcuL2FqYXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBGbHV4IHtcbiAgICBjb25zdHJ1Y3RvcihpZCkge1xuICAgICAgICB0aGlzLmRvbSA9ICQoJyNjb250ZW50Jyk7XG4gICAgICAgIHRoaXMuZG9tLmh0bWwoJycpO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGFqYXguZ2V0Rmx1eChpZCwgKHhtbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMueG1sID0geG1sO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRmx1eCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KHhtbCkge1xuICAgICAgICB0aGlzLnhtbCA9IHhtbDtcbiAgICAgICAgdGhpcy5yZW5kZXJGbHV4KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRmx1eCgpIHtcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICB0aGlzLmRvbS5hcHBlbmQoYDxpbWcgc3JjPSR7dGhpcy5nZXRJbWFnZSgpfSBjbGFzcz1cInBhZ2UtaGVhZGVyXCIvPmApO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGk8aXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICB0aGlzLmRvbS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJpdGVtIHJvdyBwbGFjZWhvbGRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMCBwbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PiR7aXRlbS50aXRsZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkXCI+JHtpdGVtLmRlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9JHtpdGVtLmxpbmt9PkxpcmUgbCdhcnRpY2xlPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRpdGxlKCkge1xuICAgICAgICBpZiAoIXRoaXMudGl0bGUpXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy54bWwucXVlcnlTZWxlY3RvcigndGl0bGUnKS50ZXh0Q29udGVudDtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbWFnZSlcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnhtbC5xdWVyeVNlbGVjdG9yKCdpbWFnZSB1cmwnKS50ZXh0Q29udGVudDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy54bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2l0ZW0nKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBsaW5rOiBpdGVtc1tpXS5xdWVyeVNlbGVjdG9yKCdsaW5rJykudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtc1tpXS5xdWVyeVNlbGVjdG9yKCd0aXRsZScpLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbXNbaV0ucXVlcnlTZWxlY3RvcignZGVzY3JpcHRpb24nKS50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgcHViRGF0ZTogaXRlbXNbaV0ucXVlcnlTZWxlY3RvcigncHViRGF0ZScpLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBlbmNsb3N1cmU6IGl0ZW1zW2ldLnF1ZXJ5U2VsZWN0b3IoJ2VuY2xvc3VyZScpLmdldEF0dHJpYnV0ZSgndXJsJyksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2V4YW1wbGUvJ1xuLy9tb2R1bGUuZXhwb3J0cyA9ICdodHRwOi8vcWNsb2FyZWMuY29tOjgwODAvJ1xuIiwibGV0IGFzc2VydCA9IGNoYWkuYXNzZXJ0O1xubGV0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xubGV0IHRlc3RGb2xkZXIgPSBcIi4vdGVzdC90ZXN0RGF0YS9cIjtcbmxldCBhamF4ID0gcmVxdWlyZSgnLi4vc3JjL2pzL2FqYXgnKTtcbmxldCBmbHV4ID0gcmVxdWlyZSgnLi4vc3JjL2pzL2ZsdXgnKTtcblxuZGVzY3JpYmUoJ0FqYXgnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2dldCBsaXN0IGZsdXgnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgZ2V0IGEgbGlzdCBvZiBsZW5ndGggMicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGFqYXguZ2V0TGlzdEZsdXgoKGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwobGlzdC5sZW5ndGgsIDIpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0sIGAke3Rlc3RGb2xkZXJ9ZmVlZHMuanNvbmApO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBnZXQgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgYWpheC5nZXRMaXN0Rmx1eCgobGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsID0gbGlzdFswXTtcbiAgICAgICAgICAgICAgICBleHBlY3QobCkudG8uaGF2ZS5wcm9wZXJ0eSgnaWQnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobCkudG8uaGF2ZS5wcm9wZXJ0eSgndGl0bGUnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobCkudG8uaGF2ZS5wcm9wZXJ0eSgndW5rbm93Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGwpLnRvLmhhdmUucHJvcGVydHkoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGwpLnRvLmhhdmUucHJvcGVydHkoJ2RhdGUnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9LCBgJHt0ZXN0Rm9sZGVyfWZlZWRzLmpzb25gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZ2V0IGFuIG9iamVjdCB3aXRoIDUgcHJvcGVydGllcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGFqYXguZ2V0TGlzdEZsdXgoKGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwoT2JqZWN0LmtleXMobGlzdFswXSkubGVuZ3RoLCA1KTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9LCBgJHt0ZXN0Rm9sZGVyfWZlZWRzLmpzb25gKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IGZsdXgnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgZ2V0IGEgeG1sIGZpbGUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBhamF4LmdldEZsdXgoMTEsIChmbHV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKCQuaXNYTUxEb2MoZmx1eCksIHRydWUpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0sIGAke3Rlc3RGb2xkZXJ9ZmVlZC9gKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ0ZsdXgnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2NyZWF0ZSBmbHV4JywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIG5ldyBmbHV4IHdpdGggMjYgaXRlbScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGFqYXguZ2V0Rmx1eCgxMSwgKHhtbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmID0gbmV3IGZsdXgoKTtcbiAgICAgICAgICAgICAgICBmLmluaXQoeG1sKTtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwoJChcIi5pdGVtXCIpLmxlbmd0aCwgMjYpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0sIGAke3Rlc3RGb2xkZXJ9ZmVlZC9gKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
