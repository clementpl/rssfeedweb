(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.M = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, [{
    key: 'post',
    value: function post(url, body, callback) {}
  }, {
    key: 'get',
    value: function get(url, callback) {
      $.ajax({
        url: url,
        dataType: 'xml',
        method: 'GET',
        success: function success(xml) {
          callback(xml);
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

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ajax = require("./ajax");

module.exports = function () {
    function Flux(url, ready) {
        var _this = this;

        _classCallCheck(this, Flux);

        ajax.get(url, function (xml) {
            _this.xml = xml;
            ready();
        });
    }

    _createClass(Flux, [{
        key: 'getTitle',
        value: function getTitle() {
            if (!this.title) this.title = this.xml.querySelector('title').textContent;
            return this.title;
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flux = require("./flux");

var ListFlux = function ListFlux() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  _classCallCheck(this, ListFlux);

  this.dom = $('#listFlux');
  for (var i = 0; i < list.length; i++) {
    this.dom.append('<li><a href="#">' + list[i].name + '</a></li>').on('click', function () {
      console.log('click' + this.name);
    }.bind(list[i]));
  }
};

module.exports = ListFlux;

},{"./flux":2}],4:[function(require,module,exports){
"use strict";

var Flux = require("./flux");
var listFlux = require("./listFlux");

var M = {
  init: function init() {
    var list = new listFlux([{ name: 'test', url: 'test.xml' }]);

    /*
        let test = new Flux ('/test.xml', () => {
          console.log(test.getItems());
        });
    */
  }
};

window.onload = function () {
  M.init();
};

},{"./flux":2,"./listFlux":3}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWpheC5qcyIsInNyYy9qcy9mbHV4LmpzIiwic3JjL2pzL2xpc3RGbHV4LmpzIiwic3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxJO0FBQ0osa0JBQWM7QUFBQTtBQUNiOzs7O3lCQUVJLEcsRUFBSyxJLEVBQU0sUSxFQUFVLENBRXpCOzs7d0JBRUcsRyxFQUFLLFEsRUFBVTtBQUNqQixRQUFFLElBQUYsQ0FBTztBQUNMLGFBQUssR0FEQTtBQUVMLGtCQUFVLEtBRkw7QUFHTCxnQkFBUSxLQUhIO0FBSUwsaUJBQVMsaUJBQUMsR0FBRCxFQUFTO0FBQ2hCLG1CQUFTLEdBQVQ7QUFDRCxTQU5JO0FBT0wsZUFBTyxLQUFLO0FBUFAsT0FBUDtBQVNEOzs7aUNBRVksSyxFQUFPO0FBQ2xCLGNBQVEsR0FBUixDQUFZLEtBQVo7QUFDRDs7Ozs7O0FBR0gsT0FBTyxPQUFQLEdBQWlCLElBQUksSUFBSixFQUFqQjs7Ozs7Ozs7O0FDekJBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDs7QUFFQSxPQUFPLE9BQVA7QUFDSSxrQkFBWSxHQUFaLEVBQWlCLEtBQWpCLEVBQXdCO0FBQUE7O0FBQUE7O0FBQ3BCLGFBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxVQUFDLEdBQUQsRUFBUztBQUNuQixrQkFBSyxHQUFMLEdBQVcsR0FBWDtBQUNBO0FBQ0gsU0FIRDtBQUlIOztBQU5MO0FBQUE7QUFBQSxtQ0FRZTtBQUNQLGdCQUFJLENBQUMsS0FBSyxLQUFWLEVBQ0ksS0FBSyxLQUFMLEdBQWEsS0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxXQUE3QztBQUNKLG1CQUFPLEtBQUssS0FBWjtBQUNIO0FBWkw7QUFBQTtBQUFBLG1DQWNlO0FBQ1AsZ0JBQUksQ0FBQyxLQUFLLEtBQVYsRUFBaUI7QUFDYixxQkFBSyxLQUFMLEdBQWEsRUFBYjtBQUNBLG9CQUFJLFFBQVEsS0FBSyxHQUFMLENBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsQ0FBWjtBQUNBLHFCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyx5QkFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQjtBQUNaLDhCQUFNLE1BQU0sQ0FBTixFQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsV0FEekI7QUFFWiwrQkFBTyxNQUFNLENBQU4sRUFBUyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFdBRjNCO0FBR1oscUNBQWEsTUFBTSxDQUFOLEVBQVMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxXQUh2QztBQUlaLGlDQUFTLE1BQU0sQ0FBTixFQUFTLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsV0FKL0I7QUFLWixtQ0FBVyxNQUFNLENBQU4sRUFBUyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLFlBQXBDLENBQWlELEtBQWpEO0FBTEMscUJBQWhCO0FBT0g7QUFDSjtBQUNELG1CQUFPLEtBQUssS0FBWjtBQUNIO0FBN0JMOztBQUFBO0FBQUE7Ozs7Ozs7QUNGQSxJQUFJLE9BQU8sUUFBUSxRQUFSLENBQVg7O0lBRU0sUSxHQUNKLG9CQUFxQjtBQUFBLE1BQVQsSUFBUyx1RUFBSixFQUFJOztBQUFBOztBQUNuQixPQUFLLEdBQUwsR0FBVyxFQUFFLFdBQUYsQ0FBWDtBQUNBLE9BQUssSUFBSSxJQUFFLENBQVgsRUFBYyxJQUFFLEtBQUssTUFBckIsRUFBNkIsR0FBN0IsRUFBa0M7QUFDaEMsU0FBSyxHQUFMLENBQVMsTUFBVCxzQkFBbUMsS0FBSyxDQUFMLEVBQVEsSUFBM0MsZ0JBQTRELEVBQTVELENBQStELE9BQS9ELEVBQXdFLFlBQVc7QUFDakYsY0FBUSxHQUFSLENBQVksVUFBVSxLQUFLLElBQTNCO0FBQ0QsS0FGdUUsQ0FFdEUsSUFGc0UsQ0FFakUsS0FBSyxDQUFMLENBRmlFLENBQXhFO0FBR0Q7QUFDRixDOztBQUdILE9BQU8sT0FBUCxHQUFpQixRQUFqQjs7Ozs7QUNiQSxJQUFJLE9BQU8sUUFBUSxRQUFSLENBQVg7QUFDQSxJQUFJLFdBQVcsUUFBUSxZQUFSLENBQWY7O0FBRUEsSUFBSSxJQUFJO0FBQ04sUUFBTSxnQkFBTTtBQUNWLFFBQUksT0FBTyxJQUFJLFFBQUosQ0FBYSxDQUFDLEVBQUMsTUFBTSxNQUFQLEVBQWUsS0FBSSxVQUFuQixFQUFELENBQWIsQ0FBWDs7QUFFSjs7Ozs7QUFLRztBQVRLLENBQVI7O0FBWUEsT0FBTyxNQUFQLEdBQWdCLFlBQU07QUFDcEIsSUFBRSxJQUFGO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBBamF4IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwb3N0KHVybCwgYm9keSwgY2FsbGJhY2spIHtcblxuICB9XG5cbiAgZ2V0KHVybCwgY2FsbGJhY2spIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhVHlwZTogJ3htbCcsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgc3VjY2VzczogKHhtbCkgPT4ge1xuICAgICAgICBjYWxsYmFjayh4bWwpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiB0aGlzLmVycm9ySGFuZGxlclxuICAgIH0pXG4gIH1cblxuICBlcnJvckhhbmRsZXIoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQWpheCgpO1xuIiwibGV0IGFqYXggPSByZXF1aXJlKFwiLi9hamF4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEZsdXgge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgcmVhZHkpIHtcbiAgICAgICAgYWpheC5nZXQodXJsLCAoeG1sKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnhtbCA9IHhtbDtcbiAgICAgICAgICAgIHJlYWR5KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFRpdGxlKCkge1xuICAgICAgICBpZiAoIXRoaXMudGl0bGUpXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy54bWwucXVlcnlTZWxlY3RvcigndGl0bGUnKS50ZXh0Q29udGVudDtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy54bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2l0ZW0nKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBsaW5rOiBpdGVtc1tpXS5xdWVyeVNlbGVjdG9yKCdsaW5rJykudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtc1tpXS5xdWVyeVNlbGVjdG9yKCd0aXRsZScpLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbXNbaV0ucXVlcnlTZWxlY3RvcignZGVzY3JpcHRpb24nKS50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgcHViRGF0ZTogaXRlbXNbaV0ucXVlcnlTZWxlY3RvcigncHViRGF0ZScpLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBlbmNsb3N1cmU6IGl0ZW1zW2ldLnF1ZXJ5U2VsZWN0b3IoJ2VuY2xvc3VyZScpLmdldEF0dHJpYnV0ZSgndXJsJylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgICB9XG59XG4iLCJsZXQgRmx1eCA9IHJlcXVpcmUoXCIuL2ZsdXhcIik7XG5cbmNsYXNzIExpc3RGbHV4IHtcbiAgY29uc3RydWN0b3IobGlzdD1bXSkge1xuICAgIHRoaXMuZG9tID0gJCgnI2xpc3RGbHV4Jyk7XG4gICAgZm9yIChsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZG9tLmFwcGVuZChgPGxpPjxhIGhyZWY9XCIjXCI+JHtsaXN0W2ldLm5hbWV9PC9hPjwvbGk+YCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycgKyB0aGlzLm5hbWUpO1xuICAgICAgfS5iaW5kKGxpc3RbaV0pKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0Rmx1eDtcbiIsImxldCBGbHV4ID0gcmVxdWlyZShcIi4vZmx1eFwiKTtcbmxldCBsaXN0Rmx1eCA9IHJlcXVpcmUoXCIuL2xpc3RGbHV4XCIpO1xuXG5sZXQgTSA9IHtcbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCBsaXN0ID0gbmV3IGxpc3RGbHV4KFt7bmFtZTogJ3Rlc3QnLCB1cmw6J3Rlc3QueG1sJ31dKTtcblxuLypcbiAgICBsZXQgdGVzdCA9IG5ldyBGbHV4ICgnL3Rlc3QueG1sJywgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2codGVzdC5nZXRJdGVtcygpKTtcbiAgICB9KTtcbiovXG4gIH1cbn07XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIE0uaW5pdCgpO1xufTtcbiJdfQ==
