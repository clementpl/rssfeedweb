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
            this.get(host + 'logout', callback);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWpheC5qcyIsInNyYy9qcy9ob3N0LmpzIiwic3JjL2pzL2xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxPQUFPLFFBQVEsUUFBUixDQUFYOztJQUVNLEk7QUFDRixvQkFBYztBQUFBO0FBQUU7Ozs7Z0NBRVIsRSxFQUFJLFEsRUFBZ0M7QUFBQSxnQkFBdEIsR0FBc0IsdUVBQWIsSUFBYTs7QUFDeEMsaUJBQUssR0FBTCxNQUFZLEdBQVosR0FBa0IsRUFBbEIsRUFBd0IsUUFBeEIsRUFBa0MsS0FBbEM7QUFDSDs7O29DQUVXLFEsRUFBcUM7QUFBQSxnQkFBM0IsR0FBMkIsdUVBQWxCLElBQWtCOztBQUM3QyxpQkFBSyxHQUFMLENBQVMsR0FBVCxFQUFjLFVBQUMsUUFBRCxFQUFjO0FBQ3hCLG9CQUFJLE9BQU8sU0FBUyxLQUFULElBQWtCLEVBQTdCO0FBQ0Esb0JBQUksVUFBVSxFQUFkO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLE1BQXpCLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDO0FBQ0Esd0JBQUksSUFBSSxLQUFLLENBQUwsQ0FBUjtBQUNBLDRCQUFRLElBQVIsQ0FBYTtBQUNULDRCQUFJLEVBQUUsQ0FBRixDQURLO0FBRVQsK0JBQU8sRUFBRSxDQUFGLENBRkU7QUFHVCxnQ0FBUSxFQUFFLENBQUYsQ0FIQztBQUlULHFDQUFhLEVBQUUsQ0FBRixDQUpKO0FBS1QsOEJBQU0sRUFBRSxDQUFGO0FBTEcscUJBQWI7QUFPSDtBQUNELHlCQUFTLE9BQVQ7QUFDSCxhQWZEO0FBZ0JIOzs7a0NBRVMsTSxFQUFRLFEsRUFBVTtBQUN4QixpQkFBSyxJQUFMLENBQWEsSUFBYixnQkFBOEI7QUFDMUIscUJBQUs7QUFEcUIsYUFBOUIsRUFFRyxRQUZIO0FBR0g7OzsrQkFFTSxRLEVBQVU7QUFDYixp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LEVBQUUsMEJBQUYsRUFBOEIsR0FBOUIsRUFBWDtBQUNBLFFBQUksT0FBTyxFQUFFLDBCQUFGLEVBQThCLEdBQTlCLEVBQVg7QUFDQSxRQUFJLFFBQVEsRUFBRSxrQ0FBRixFQUFzQyxHQUF0QyxFQUFaO0FBQ0EsUUFBSSxRQUFRLEVBQVIsSUFBYyxRQUFRLEVBQXRCLElBQTRCLFNBQVMsSUFBekMsRUFBK0M7QUFDN0MsV0FBSyxJQUFMLENBQWEsSUFBYixhQUEyQjtBQUN6QixnQkFBUSxJQURpQjtBQUV6QixrQkFBVTtBQUZlLE9BQTNCLEVBR0csVUFBQyxRQUFELEVBQWM7QUFDZixnQkFBUSxHQUFSLENBQVksbUJBQVo7QUFDQSxnQkFBUSxHQUFSLENBQVksUUFBWjtBQUNBLGNBQU0sSUFBTixFQUFZLElBQVo7QUFDRCxPQVBEO0FBUUQsS0FURCxNQVNPO0FBQ0wsVUFBSSxRQUFRLEVBQVIsSUFBYyxRQUFRLEVBQTFCLEVBQ0UsRUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixnREFBcEIsRUFBc0UsSUFBdEUsR0FERixLQUVLLElBQUksU0FBUyxJQUFiLEVBQ0gsRUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixzRUFBcEIsRUFBNEYsSUFBNUY7QUFDSDtBQUNGLEdBcEJEO0FBcUJELENBNUREIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBob3N0ID0gcmVxdWlyZSgnLi9ob3N0Jyk7XG5cbmNsYXNzIEFqYXgge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGdldEZsdXgoaWQsIGNhbGxiYWNrLCB1cmwgPSBgJHtob3N0fWZlZWQvYCkge1xuICAgICAgICB0aGlzLmdldChgJHt1cmx9JHtpZH1gLCBjYWxsYmFjaywgJ3htbCcpO1xuICAgIH1cblxuICAgIGdldExpc3RGbHV4KGNhbGxiYWNrLCB1cmwgPSBgJHtob3N0fWZlZWRzLmpzb25gKSB7XG4gICAgICAgIHRoaXMuZ2V0KHVybCwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGlzdCA9IHJlc3BvbnNlLmZlZWRzIHx8IFtdO1xuICAgICAgICAgICAgbGV0IGxpc3RyZXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vWzBdID09IGlkICwgWzFdID09IHRpdGxlLCBbMl0gPT0gPyBbM10gPT0gZGVzY3JpcHRpb24sIFs0XSA9PSBkYXRlXG4gICAgICAgICAgICAgICAgbGV0IGwgPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgIGxpc3RyZXQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBsWzBdLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogbFsxXSxcbiAgICAgICAgICAgICAgICAgICAgdW5rbm93OiBsWzJdLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbFszXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbFs0XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGxpc3RyZXQpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1YnNjcmliZSh1cmxyc3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucG9zdChgJHtob3N0fXN1YnNjcmliZWAsIHtcbiAgICAgICAgICAgIHVybDogdXJscnNzXG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5nZXQoYCR7aG9zdH1sb2dvdXRgLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcG9zdCh1cmwsIGJvZHksIGNhbGxiYWNrKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGJvZHksXG4gICAgICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5lcnJvckhhbmRsZXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0KHVybCwgY2FsbGJhY2ssIHJlc3BvbnNlVHlwZSA9ICdqc29uJykge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBkYXRhVHlwZTogcmVzcG9uc2VUeXBlLFxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5lcnJvckhhbmRsZXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXJyb3JIYW5kbGVyKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEFqYXgoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9leGFtcGxlLydcbi8vbW9kdWxlLmV4cG9ydHMgPSAnaHR0cDovL3FjbG9hcmVjLmNvbTo4MDgwLydcbiIsImxldCBhamF4ID0gcmVxdWlyZSgnLi9hamF4Jyk7XG5sZXQgaG9zdCA9IHJlcXVpcmUoJy4vaG9zdCcpO1xuXG4kKGZ1bmN0aW9uKCkge1xuXG4gICQoJyNsb2dpbi1mb3JtLWxpbmsnKS5jbGljaygoZSkgPT4ge1xuICAgICQoXCIjbG9naW4tZm9ybVwiKS5kZWxheSgxMDApLmZhZGVJbigxMDApO1xuICAgICQoXCIjcmVnaXN0ZXItZm9ybVwiKS5mYWRlT3V0KDEwMCk7XG4gICAgJCgnI3JlZ2lzdGVyLWZvcm0tbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuICAkKCcjcmVnaXN0ZXItZm9ybS1saW5rJykuY2xpY2soKGUpID0+IHtcbiAgICAkKFwiI3JlZ2lzdGVyLWZvcm1cIikuZGVsYXkoMTAwKS5mYWRlSW4oMTAwKTtcbiAgICAkKFwiI2xvZ2luLWZvcm1cIikuZmFkZU91dCgxMDApO1xuICAgICQoJyNsb2dpbi1mb3JtLWxpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICBmdW5jdGlvbiBsb2dpbih1c2VyLCBwYXNzKSB7XG4gICAgYWpheC5wb3N0KGAke2hvc3R9c2lnbmluYCwge1xuICAgICAgdXNlcklkOiB1c2VyLFxuICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGJhY2sgbG9naW5cIik7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gXCIvaW5kZXguaHRtbFwiO1xuICAgIH0pO1xuICB9XG5cbiAgJCgnI2xvZ2luLWZvcm0nKS5zdWJtaXQoKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVzZXIgPSAkKCcjbG9naW4tZm9ybSAjdXNlcm5hbWUnKS52YWwoKTtcbiAgICBsZXQgcGFzcyA9ICQoJyNsb2dpbi1mb3JtICNwYXNzd29yZCcpLnZhbCgpO1xuICAgIGlmICh1c2VyICE9IFwiXCIgJiYgcGFzcyAhPSBcIlwiKSB7XG4gICAgICBsb2dpbih1c2VyLCBwYXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNlcnJvckJveFwiKS5odG1sKCc8c3Ryb25nPlVzZXJuYW1lIGFuZCBwYXNzd29yZCByZXF1aXJlPC9zdHJvbmc+Jykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCgnI3JlZ2lzdGVyLWZvcm0nKS5zdWJtaXQoKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVzZXIgPSAkKCcjcmVnaXN0ZXItZm9ybSAjdXNlcm5hbWUnKS52YWwoKTtcbiAgICBsZXQgcGFzcyA9ICQoJyNyZWdpc3Rlci1mb3JtICNwYXNzd29yZCcpLnZhbCgpO1xuICAgIGxldCBwYXNzYyA9ICQoJyNyZWdpc3Rlci1mb3JtICNjb25maXJtLXBhc3N3b3JkJykudmFsKCk7XG4gICAgaWYgKHVzZXIgIT0gXCJcIiAmJiBwYXNzICE9IFwiXCIgJiYgcGFzc2MgPT0gcGFzcykge1xuICAgICAgYWpheC5wb3N0KGAke2hvc3R9c2lnbnVwYCwge1xuICAgICAgICB1c2VySWQ6IHVzZXIsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzXG4gICAgICB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsYmFjayByZWdpc3RlclwiKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBsb2dpbih1c2VyLCBwYXNzKTtcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh1c2VyID09IFwiXCIgfHwgcGFzcyA9PSBcIlwiKVxuICAgICAgICAkKFwiI2Vycm9yQm94XCIpLmh0bWwoJzxzdHJvbmc+VXNlcm5hbWUgYW5kIHBhc3N3b3JkIHJlcXVpcmU8L3N0cm9uZz4nKS5zaG93KCk7XG4gICAgICBlbHNlIGlmIChwYXNzYyAhPSBwYXNzKVxuICAgICAgICAkKFwiI2Vycm9yQm94XCIpLmh0bWwoJzxzdHJvbmc+UGFzc3dvcmQgYW5kIHBhc3N3b3JkIGNvbmZpcm1hdGlvbiBtdXN0IGJlIHRoZSBzYW1lPC9zdHJvbmc+Jykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdfQ==
