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
            var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : host + 'feeds';

            this.get(url, function (response) {
                /*            let list = response.feeds || [];
                            let listret = [];
                            for (let i = 0; i < list.length; i++) {
                                //[0] == id , [1] == title, [2] == ? [3] == description, [4] == date
                                let l = list[i];
                                listret.push({
                                    id: l[0],
                                    title: l[1],
                                    unknow: l[2],
                                    description: l[3],
                                    date: l[4],
                                });
                            }
                            callback(listret)
                */
                callback(response.feeds);
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
                success: function success(response) {
                    if (response.Error == "You are not connected") _this2.redirectLogin();
                    callback(response);
                },
                error: function error(response) {
                    if (response.responseJSON && response.responseJSON.Error) {
                        response.Error = response.responseJSON.Error;
                        callback(response);
                    } else _this2.errorHandler();
                }
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
                success: function success(response) {
                    if (response.Error == "You are not connected") _this3.redirectLogin();
                    callback(response);
                },
                error: function error(response) {
                    if (response.responseJSON && response.responseJSON.Error) {
                        response.Error = response.responseJSON.Error;
                        callback(response);
                    } else _this3.errorHandler();
                }
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
            alert("Error serveur (500)");
            console.log(error);
        }
    }]);

    return Ajax;
}();

module.exports = new Ajax();

},{"./host":2}],2:[function(require,module,exports){
'use strict';

//module.exports = 'http://localhost:8000/example/'
module.exports = 'http://qcloarec.com:8080/';

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
            if (response.Error) $("#errorBox").html('<strong>' + response.Error + '</strong>').show();else document.location.href = "/index.html";
        });
    }

    function register(user, pass) {
        ajax.post(host + 'signup', {
            userId: user,
            password: pass
        }, function (response) {
            if (response.Error) $("#errorBox").html('<strong>' + response.Error + '</strong>').show();else document.location.href = "/index.html";
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
            register();
        } else {
            if (user == "" || pass == "") $("#errorBox").html('<strong>Username and password require</strong>').show();else if (passc != pass) $("#errorBox").html('<strong>Password and password confirmation must be the same</strong>').show();
        }
    });
});

},{"./ajax":1,"./host":2}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWpheC5qcyIsInNyYy9qcy9ob3N0LmpzIiwic3JjL2pzL2xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxPQUFPLFFBQVEsUUFBUixDQUFYOztJQUVNLEk7QUFDRixvQkFBYztBQUFBO0FBQUU7Ozs7Z0NBRVIsRSxFQUFJLFEsRUFBZ0M7QUFBQSxnQkFBdEIsR0FBc0IsdUVBQWIsSUFBYTs7QUFDeEMsaUJBQUssR0FBTCxNQUFZLEdBQVosR0FBa0IsRUFBbEIsRUFBd0IsUUFBeEIsRUFBa0MsS0FBbEM7QUFDSDs7O29DQUVXLFEsRUFBZ0M7QUFBQSxnQkFBdEIsR0FBc0IsdUVBQWIsSUFBYTs7QUFDeEMsaUJBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxVQUFDLFFBQUQsRUFBYztBQUNwQzs7Ozs7Ozs7Ozs7Ozs7O0FBZVUseUJBQVMsU0FBUyxLQUFsQjtBQUNELGFBakJEO0FBa0JIOzs7a0NBRVMsTSxFQUFRLFEsRUFBVTtBQUN4QixpQkFBSyxJQUFMLENBQWEsSUFBYixnQkFBOEI7QUFDMUIscUJBQUs7QUFEcUIsYUFBOUIsRUFFRyxRQUZIO0FBR0g7OzsrQkFFTSxRLEVBQVU7QUFBQTs7QUFDYixpQkFBSyxHQUFMLENBQVksSUFBWixhQUEwQixVQUFDLFFBQUQsRUFBYztBQUNwQyxzQkFBSyxhQUFMO0FBQ0gsYUFGRDtBQUdIOzs7NkJBRUksRyxFQUFLLEksRUFBTSxRLEVBQVU7QUFBQTs7QUFDdEIsY0FBRSxJQUFGLENBQU87QUFDSCxxQkFBSyxHQURGO0FBRUgsMEJBQVUsTUFGUDtBQUdILHNCQUFNLE1BSEg7QUFJSCxzQkFBTSxJQUpIO0FBS0gseUJBQVMsaUJBQUMsUUFBRCxFQUFjO0FBQ3ZCLHdCQUFJLFNBQVMsS0FBVCxJQUFrQix1QkFBdEIsRUFDSSxPQUFLLGFBQUw7QUFDRiw2QkFBUyxRQUFUO0FBQ0QsaUJB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ImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgaG9zdCA9IHJlcXVpcmUoJy4vaG9zdCcpO1xuXG5jbGFzcyBBamF4IHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBnZXRGbHV4KGlkLCBjYWxsYmFjaywgdXJsID0gYCR7aG9zdH1mZWVkL2ApIHtcbiAgICAgICAgdGhpcy5nZXQoYCR7dXJsfSR7aWR9YCwgY2FsbGJhY2ssICd4bWwnKTtcbiAgICB9XG5cbiAgICBnZXRMaXN0Rmx1eChjYWxsYmFjaywgdXJsID0gYCR7aG9zdH1mZWVkc2ApIHtcbiAgICAgICAgdGhpcy5nZXQodXJsLCAocmVzcG9uc2UpID0+IHtcbi8qICAgICAgICAgICAgbGV0IGxpc3QgPSByZXNwb25zZS5mZWVkcyB8fCBbXTtcbiAgICAgICAgICAgIGxldCBsaXN0cmV0ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvL1swXSA9PSBpZCAsIFsxXSA9PSB0aXRsZSwgWzJdID09ID8gWzNdID09IGRlc2NyaXB0aW9uLCBbNF0gPT0gZGF0ZVxuICAgICAgICAgICAgICAgIGxldCBsID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICBsaXN0cmV0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbFswXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGxbMV0sXG4gICAgICAgICAgICAgICAgICAgIHVua25vdzogbFsyXSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGxbM10sXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGxbNF0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhsaXN0cmV0KVxuKi9cbiAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5mZWVkcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1YnNjcmliZSh1cmxyc3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucG9zdChgJHtob3N0fXN1YnNjcmliZWAsIHtcbiAgICAgICAgICAgIHVybDogdXJscnNzXG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5nZXQoYCR7aG9zdH1sb2dvdXRgLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RMb2dpbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwb3N0KHVybCwgYm9keSwgY2FsbGJhY2spIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogYm9keSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLkVycm9yID09IFwiWW91IGFyZSBub3QgY29ubmVjdGVkXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdExvZ2luKCk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlSlNPTiAmJiByZXNwb25zZS5yZXNwb25zZUpTT04uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuRXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04uRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQodXJsLCBjYWxsYmFjaywgcmVzcG9uc2VUeXBlID0gJ2pzb24nKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiByZXNwb25zZVR5cGUsXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuRXJyb3IgPT0gXCJZb3UgYXJlIG5vdCBjb25uZWN0ZWRcIilcbiAgICAgICAgICAgICAgICB0aGlzLnJlZGlyZWN0TG9naW4oKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2VKU09OICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5FcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5FcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZGlyZWN0TG9naW4oKSB7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy9sb2dpbi5odG1sJztcbiAgICB9XG5cbiAgICBlcnJvckhhbmRsZXIoZXJyb3IpIHtcbiAgICAgIGFsZXJ0KFwiRXJyb3Igc2VydmV1ciAoNTAwKVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEFqYXgoKTtcbiIsIi8vbW9kdWxlLmV4cG9ydHMgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2V4YW1wbGUvJ1xubW9kdWxlLmV4cG9ydHMgPSAnaHR0cDovL3FjbG9hcmVjLmNvbTo4MDgwLydcbiIsImxldCBhamF4ID0gcmVxdWlyZSgnLi9hamF4Jyk7XG5sZXQgaG9zdCA9IHJlcXVpcmUoJy4vaG9zdCcpO1xuXG4kKGZ1bmN0aW9uKCkge1xuXG4gICAgJCgnI2xvZ2luLWZvcm0tbGluaycpLmNsaWNrKChlKSA9PiB7XG4gICAgICAgICQoXCIjbG9naW4tZm9ybVwiKS5kZWxheSgxMDApLmZhZGVJbigxMDApO1xuICAgICAgICAkKFwiI3JlZ2lzdGVyLWZvcm1cIikuZmFkZU91dCgxMDApO1xuICAgICAgICAkKCcjcmVnaXN0ZXItZm9ybS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgICQoJyNyZWdpc3Rlci1mb3JtLWxpbmsnKS5jbGljaygoZSkgPT4ge1xuICAgICAgICAkKFwiI3JlZ2lzdGVyLWZvcm1cIikuZGVsYXkoMTAwKS5mYWRlSW4oMTAwKTtcbiAgICAgICAgJChcIiNsb2dpbi1mb3JtXCIpLmZhZGVPdXQoMTAwKTtcbiAgICAgICAgJCgnI2xvZ2luLWZvcm0tbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGxvZ2luKHVzZXIsIHBhc3MpIHtcbiAgICAgICAgYWpheC5wb3N0KGAke2hvc3R9c2lnbmluYCwge1xuICAgICAgICAgICAgdXNlcklkOiB1c2VyLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuRXJyb3IpXG4gICAgICAgICAgICAgICAgJChcIiNlcnJvckJveFwiKS5odG1sKGA8c3Ryb25nPiR7cmVzcG9uc2UuRXJyb3J9PC9zdHJvbmc+YCkuc2hvdygpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleC5odG1sXCI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKHVzZXIsIHBhc3MpIHtcbiAgICAgICAgYWpheC5wb3N0KGAke2hvc3R9c2lnbnVwYCwge1xuICAgICAgICAgICAgdXNlcklkOiB1c2VyLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICAgICAgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuRXJyb3IpXG4gICAgICAgICAgICAgICAgJChcIiNlcnJvckJveFwiKS5odG1sKGA8c3Ryb25nPiR7cmVzcG9uc2UuRXJyb3J9PC9zdHJvbmc+YCkuc2hvdygpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleC5odG1sXCI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJyNsb2dpbi1mb3JtJykuc3VibWl0KChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHVzZXIgPSAkKCcjbG9naW4tZm9ybSAjdXNlcm5hbWUnKS52YWwoKTtcbiAgICAgICAgbGV0IHBhc3MgPSAkKCcjbG9naW4tZm9ybSAjcGFzc3dvcmQnKS52YWwoKTtcbiAgICAgICAgaWYgKHVzZXIgIT0gXCJcIiAmJiBwYXNzICE9IFwiXCIpIHtcbiAgICAgICAgICAgIGxvZ2luKHVzZXIsIHBhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIiNlcnJvckJveFwiKS5odG1sKCc8c3Ryb25nPlVzZXJuYW1lIGFuZCBwYXNzd29yZCByZXF1aXJlPC9zdHJvbmc+Jykuc2hvdygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjcmVnaXN0ZXItZm9ybScpLnN1Ym1pdCgoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCB1c2VyID0gJCgnI3JlZ2lzdGVyLWZvcm0gI3VzZXJuYW1lJykudmFsKCk7XG4gICAgICAgIGxldCBwYXNzID0gJCgnI3JlZ2lzdGVyLWZvcm0gI3Bhc3N3b3JkJykudmFsKCk7XG4gICAgICAgIGxldCBwYXNzYyA9ICQoJyNyZWdpc3Rlci1mb3JtICNjb25maXJtLXBhc3N3b3JkJykudmFsKCk7XG4gICAgICAgIGlmICh1c2VyICE9IFwiXCIgJiYgcGFzcyAhPSBcIlwiICYmIHBhc3NjID09IHBhc3MpIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodXNlciA9PSBcIlwiIHx8IHBhc3MgPT0gXCJcIilcbiAgICAgICAgICAgICAgICAkKFwiI2Vycm9yQm94XCIpLmh0bWwoJzxzdHJvbmc+VXNlcm5hbWUgYW5kIHBhc3N3b3JkIHJlcXVpcmU8L3N0cm9uZz4nKS5zaG93KCk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYXNzYyAhPSBwYXNzKVxuICAgICAgICAgICAgICAgICQoXCIjZXJyb3JCb3hcIikuaHRtbCgnPHN0cm9uZz5QYXNzd29yZCBhbmQgcGFzc3dvcmQgY29uZmlybWF0aW9uIG11c3QgYmUgdGhlIHNhbWU8L3N0cm9uZz4nKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIl19
