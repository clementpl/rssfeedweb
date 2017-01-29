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
        key: 'subscribe',
        value: function subscribe(urlrss, callback) {
            this.post(host + 'subscribe', {
                url: urlrss
            }, callback);
        }
    }, {
        key: 'logout',
        value: function logout(callback) {
            var _this = this;

            this.get(host + 'logout', function (response) {
                _this.redirectLogin();
            });
        }
    }, {
        key: 'post',
        value: function post(url, body, callback) {
            var _this2 = this;

            $.ajax({
                url: url,
                dataType: 'json',
                type: "POST",
                data: body,
                crossDomain: true,
                success: function success(response) {
                    if (response.Error == "You are not connected") _this2.redirectLogin();
                    callback(response);
                },
                error: this.errorHandler
            });
        }
    }, {
        key: 'get',
        value: function get(url, callback) {
            var _this3 = this;

            var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'json';

            $.ajax({
                url: url,
                dataType: responseType,
                type: 'GET',
                crossDomain: true,
                success: function success(response) {
                    if (response.Error == "You are not connected") _this3.redirectLogin();
                    callback(response);
                },
                error: this.errorHandler
            });
        }
    }, {
        key: 'redirectLogin',
        value: function redirectLogin() {
            document.location.href = '/login.html';
        }
    }, {
        key: 'errorHandler',
        value: function errorHandler(error) {
            alert("error 500");
            console.log(error);
        }
    }]);

    return Ajax;
}();

module.exports = new Ajax();

},{"./host":2}],2:[function(require,module,exports){
'use strict';

module.exports = 'http://localhost:8000/example/';
//module.exports = 'http://qcloarec.com:8080/'

},{}],3:[function(require,module,exports){
'use strict';

var ajax = require('./ajax');
var host = require('./host');

$(function () {
  var _this = this;

  $('#login-form-link').click(function (e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(_this).addClass('active');
    e.preventDefault();
  });
  $('#register-form-link').click(function (e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(_this).addClass('active');
    e.preventDefault();
  });

  function login(user, pass) {
    ajax.post(host + 'signin', {
      userId: user,
      password: pass
    }, function (response) {
      console.log("callback login");
      console.log(response);
      document.location.href = "/index.html";
    });
  }

  $('#login-form').submit(function (e) {
    e.preventDefault();
    var user = $('#login-form #username').val();
    var pass = $('#login-form #password').val();
    if (user != "" && pass != "") {
      login(user, pass);
    } else {
      $("#errorBox").html('<strong>Username and password require</strong>').show();
    }
  });

  $('#register-form').submit(function (e) {
    e.preventDefault();
    var user = $('#register-form #username').val();
    var pass = $('#register-form #password').val();
    var passc = $('#register-form #confirm-password').val();
    if (user != "" && pass != "" && passc == pass) {
      ajax.post(host + 'signup', {
        userId: user,
        password: pass
      }, function (response) {
        console.log("callback register");
        console.log(response);
        login(user, pass);
      });
    } else {
      if (user == "" || pass == "") $("#errorBox").html('<strong>Username and password require</strong>').show();else if (passc != pass) $("#errorBox").html('<strong>Password and password confirmation must be the same</strong>').show();
    }
  });
});

},{"./ajax":1,"./host":2}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWpheC5qcyIsInNyYy9qcy9ob3N0LmpzIiwic3JjL2pzL2xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxPQUFPLFFBQVEsUUFBUixDQUFYOztJQUVNLEk7QUFDRixvQkFBYztBQUFBO0FBQUU7Ozs7Z0NBRVIsRSxFQUFJLFEsRUFBZ0M7QUFBQSxnQkFBdEIsR0FBc0IsdUVBQWIsSUFBYTs7QUFDeEMsaUJBQUssR0FBTCxNQUFZLEdBQVosR0FBa0IsRUFBbEIsRUFBd0IsUUFBeEIsRUFBa0MsS0FBbEM7QUFDSDs7O29DQUVXLFEsRUFBcUM7QUFBQSxnQkFBM0IsR0FBMkIsdUVBQWxCLElBQWtCOztBQUM3QyxpQkFBSyxHQUFMLENBQVMsR0FBVCxFQUFjLFVBQUMsUUFBRCxFQUFjO0FBQ3hCLG9CQUFJLE9BQU8sU0FBUyxLQUFULElBQWtCLEVBQTdCO0FBQ0Esb0JBQUksVUFBVSxFQUFkO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLE1BQXpCLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDO0FBQ0Esd0JBQUksSUFBSSxLQUFLLENBQUwsQ0FBUjtBQUNBLDRCQUFRLElBQVIsQ0FBYTtBQUNULDRCQUFJLEVBQUUsQ0FBRixDQURLO0FBRVQsK0JBQU8sRUFBRSxDQUFGLENBRkU7QUFHVCxnQ0FBUSxFQUFFLENBQUYsQ0FIQztBQUlULHFDQUFhLEVBQUUsQ0FBRixDQUpKO0FBS1QsOEJBQU0sRUFBRSxDQUFGO0FBTEcscUJBQWI7QUFPSDtBQUNELHlCQUFTLE9BQVQ7QUFDSCxhQWZEO0FBZ0JIOzs7a0NBRVMsTSxFQUFRLFEsRUFBVTtBQUN4QixpQkFBSyxJQUFMLENBQWEsSUFBYixnQkFBOEI7QUFDMUIscUJBQUs7QUFEcUIsYUFBOUIsRUFFRyxRQUZIO0FBR0g7OzsrQkFFTSxRLEVBQVU7QUFBQTs7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QUksUUFBUSxFQUFSLElBQWMsUUFBUSxFQUExQixFQUE4QjtBQUM1QixZQUFNLElBQU4sRUFBWSxJQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsUUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixnREFBcEIsRUFBc0UsSUFBdEU7QUFDRDtBQUNGLEdBVEQ7O0FBV0EsSUFBRSxnQkFBRixFQUFvQixNQUFwQixDQUEyQixVQUFDLENBQUQsRUFBTztBQUNoQyxNQUFFLGNBQUY7QUFDQSxRQUFJLE9BQU8sRUFBRSwwQkFBRixFQUE4QixHQUE5QixFQUFYO0FBQ0EsUUFBSSxPQUFPLEVBQUUsMEJBQUYsRUFBOEIsR0FBOUIsRUFBWDtBQUNBLFFBQUksUUFBUSxFQUFFLGtDQUFGLEVBQXNDLEdBQXRDLEVBQVo7QUFDQSxRQUFJLFFBQVEsRUFBUixJQUFjLFFBQVEsRUFBdEIsSUFBNEIsU0FBUyxJQUF6QyxFQUErQztBQUM3QyxXQUFLLElBQUwsQ0FBYSxJQUFiLGFBQTJCO0FBQ3pCLGdCQUFRLElBRGlCO0FBRXpCLGtCQUFVO0FBRmUsT0FBM0IsRUFHRyxVQUFDLFFBQUQsRUFBYztBQUNmLGdCQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsY0FBTSxJQUFOLEVBQVksSUFBWjtBQUNELE9BUEQ7QUFRRCxLQVRELE1BU087QUFDTCxVQUFJLFFBQVEsRUFBUixJQUFjLFFBQVEsRUFBMUIsRUFDRSxFQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLGdEQUFwQixFQUFzRSxJQUF0RSxHQURGLEtBRUssSUFBSSxTQUFTLElBQWIsRUFDSCxFQUFFLFdBQUYsRUFBZSxJQUFmLENBQW9CLHNFQUFwQixFQUE0RixJQUE1RjtBQUNIO0FBQ0YsR0FwQkQ7QUFxQkQsQ0E1REQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibGV0IGhvc3QgPSByZXF1aXJlKCcuL2hvc3QnKTtcblxuY2xhc3MgQWpheCB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZ2V0Rmx1eChpZCwgY2FsbGJhY2ssIHVybCA9IGAke2hvc3R9ZmVlZC9gKSB7XG4gICAgICAgIHRoaXMuZ2V0KGAke3VybH0ke2lkfWAsIGNhbGxiYWNrLCAneG1sJyk7XG4gICAgfVxuXG4gICAgZ2V0TGlzdEZsdXgoY2FsbGJhY2ssIHVybCA9IGAke2hvc3R9ZmVlZHMuanNvbmApIHtcbiAgICAgICAgdGhpcy5nZXQodXJsLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzcG9uc2UuZmVlZHMgfHwgW107XG4gICAgICAgICAgICBsZXQgbGlzdHJldCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy9bMF0gPT0gaWQgLCBbMV0gPT0gdGl0bGUsIFsyXSA9PSA/IFszXSA9PSBkZXNjcmlwdGlvbiwgWzRdID09IGRhdGVcbiAgICAgICAgICAgICAgICBsZXQgbCA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgbGlzdHJldC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGxbMF0sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBsWzFdLFxuICAgICAgICAgICAgICAgICAgICB1bmtub3c6IGxbMl0sXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBsWzNdLFxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBsWzRdLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2sobGlzdHJldClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKHVybHJzcywgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5wb3N0KGAke2hvc3R9c3Vic2NyaWJlYCwge1xuICAgICAgICAgICAgdXJsOiB1cmxyc3NcbiAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGxvZ291dChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmdldChgJHtob3N0fWxvZ291dGAsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdExvZ2luKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBvc3QodXJsLCBib2R5LCBjYWxsYmFjaykge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBib2R5LFxuICAgICAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5FcnJvciA9PSBcIllvdSBhcmUgbm90IGNvbm5lY3RlZFwiKVxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RMb2dpbigpO1xuICAgICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IHRoaXMuZXJyb3JIYW5kbGVyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCh1cmwsIGNhbGxiYWNrLCByZXNwb25zZVR5cGUgPSAnanNvbicpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgZGF0YVR5cGU6IHJlc3BvbnNlVHlwZSxcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLkVycm9yID09XCJZb3UgYXJlIG5vdCBjb25uZWN0ZWRcIilcbiAgICAgICAgICAgICAgICB0aGlzLnJlZGlyZWN0TG9naW4oKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiB0aGlzLmVycm9ySGFuZGxlclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWRpcmVjdExvZ2luKCkge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvbG9naW4uaHRtbCc7XG4gICAgfVxuXG4gICAgZXJyb3JIYW5kbGVyKGVycm9yKSB7XG4gICAgICBhbGVydChcImVycm9yIDUwMFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEFqYXgoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9leGFtcGxlLydcbi8vbW9kdWxlLmV4cG9ydHMgPSAnaHR0cDovL3FjbG9hcmVjLmNvbTo4MDgwLydcbiIsImxldCBhamF4ID0gcmVxdWlyZSgnLi9hamF4Jyk7XG5sZXQgaG9zdCA9IHJlcXVpcmUoJy4vaG9zdCcpO1xuXG4kKGZ1bmN0aW9uKCkge1xuXG4gICQoJyNsb2dpbi1mb3JtLWxpbmsnKS5jbGljaygoZSkgPT4ge1xuICAgICQoXCIjbG9naW4tZm9ybVwiKS5kZWxheSgxMDApLmZhZGVJbigxMDApO1xuICAgICQoXCIjcmVnaXN0ZXItZm9ybVwiKS5mYWRlT3V0KDEwMCk7XG4gICAgJCgnI3JlZ2lzdGVyLWZvcm0tbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuICAkKCcjcmVnaXN0ZXItZm9ybS1saW5rJykuY2xpY2soKGUpID0+IHtcbiAgICAkKFwiI3JlZ2lzdGVyLWZvcm1cIikuZGVsYXkoMTAwKS5mYWRlSW4oMTAwKTtcbiAgICAkKFwiI2xvZ2luLWZvcm1cIikuZmFkZU91dCgxMDApO1xuICAgICQoJyNsb2dpbi1mb3JtLWxpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICBmdW5jdGlvbiBsb2dpbih1c2VyLCBwYXNzKSB7XG4gICAgYWpheC5wb3N0KGAke2hvc3R9c2lnbmluYCwge1xuICAgICAgdXNlcklkOiB1c2VyLFxuICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGJhY2sgbG9naW5cIik7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gXCIvaW5kZXguaHRtbFwiO1xuICAgIH0pO1xuICB9XG5cbiAgJCgnI2xvZ2luLWZvcm0nKS5zdWJtaXQoKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVzZXIgPSAkKCcjbG9naW4tZm9ybSAjdXNlcm5hbWUnKS52YWwoKTtcbiAgICBsZXQgcGFzcyA9ICQoJyNsb2dpbi1mb3JtICNwYXNzd29yZCcpLnZhbCgpO1xuICAgIGlmICh1c2VyICE9IFwiXCIgJiYgcGFzcyAhPSBcIlwiKSB7XG4gICAgICBsb2dpbih1c2VyLCBwYXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNlcnJvckJveFwiKS5odG1sKCc8c3Ryb25nPlVzZXJuYW1lIGFuZCBwYXNzd29yZCByZXF1aXJlPC9zdHJvbmc+Jykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCgnI3JlZ2lzdGVyLWZvcm0nKS5zdWJtaXQoKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVzZXIgPSAkKCcjcmVnaXN0ZXItZm9ybSAjdXNlcm5hbWUnKS52YWwoKTtcbiAgICBsZXQgcGFzcyA9ICQoJyNyZWdpc3Rlci1mb3JtICNwYXNzd29yZCcpLnZhbCgpO1xuICAgIGxldCBwYXNzYyA9ICQoJyNyZWdpc3Rlci1mb3JtICNjb25maXJtLXBhc3N3b3JkJykudmFsKCk7XG4gICAgaWYgKHVzZXIgIT0gXCJcIiAmJiBwYXNzICE9IFwiXCIgJiYgcGFzc2MgPT0gcGFzcykge1xuICAgICAgYWpheC5wb3N0KGAke2hvc3R9c2lnbnVwYCwge1xuICAgICAgICB1c2VySWQ6IHVzZXIsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzXG4gICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsYmFjayByZWdpc3RlclwiKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBsb2dpbih1c2VyLCBwYXNzKTtcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh1c2VyID09IFwiXCIgfHwgcGFzcyA9PSBcIlwiKVxuICAgICAgICAkKFwiI2Vycm9yQm94XCIpLmh0bWwoJzxzdHJvbmc+VXNlcm5hbWUgYW5kIHBhc3N3b3JkIHJlcXVpcmU8L3N0cm9uZz4nKS5zaG93KCk7XG4gICAgICBlbHNlIGlmIChwYXNzYyAhPSBwYXNzKVxuICAgICAgICAkKFwiI2Vycm9yQm94XCIpLmh0bWwoJzxzdHJvbmc+UGFzc3dvcmQgYW5kIHBhc3N3b3JkIGNvbmZpcm1hdGlvbiBtdXN0IGJlIHRoZSBzYW1lPC9zdHJvbmc+Jykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdfQ==
