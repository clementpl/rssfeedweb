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
      var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : host + 'feed/' + id;

      this.get(url, callback, 'xml');
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
        success: function success(xml) {
          callback(xml);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWpheC5qcyIsInNyYy9qcy9ob3N0LmpzIiwic3JjL2pzL2xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxPQUFPLFFBQVEsUUFBUixDQUFYOztJQUVNLEk7QUFDSixrQkFBYztBQUFBO0FBQ2I7Ozs7NEJBRU8sRSxFQUFJLFEsRUFBbUM7QUFBQSxVQUF6QixHQUF5Qix1RUFBbEIsSUFBa0IsYUFBTixFQUFNOztBQUM3QyxXQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsUUFBZCxFQUF3QixLQUF4QjtBQUNEOzs7Z0NBRVcsUSxFQUFtQztBQUFBLFVBQXpCLEdBQXlCLHVFQUFsQixJQUFrQjs7QUFDN0MsV0FBSyxHQUFMLENBQVMsR0FBVCxFQUFjLFVBQUMsUUFBRCxFQUFjO0FBQzFCLFlBQUksT0FBTyxTQUFTLEtBQVQsSUFBa0IsRUFBN0I7QUFDQSxZQUFJLFVBQVUsRUFBZDtBQUNBLGFBQUssSUFBSSxJQUFFLENBQVgsRUFBYyxJQUFFLEtBQUssTUFBckIsRUFBNkIsR0FBN0IsRUFBa0M7QUFDaEM7QUFDQSxjQUFJLElBQUksS0FBSyxDQUFMLENBQVI7QUFDQSxrQkFBUSxJQUFSLENBQWE7QUFDWCxnQkFBSSxFQUFFLENBQUYsQ0FETztBQUVYLG1CQUFPLEVBQUUsQ0FBRixDQUZJO0FBR1gsb0JBQVEsRUFBRSxDQUFGLENBSEc7QUFJWCx5QkFBYSxFQUFFLENBQUYsQ0FKRjtBQUtYLGtCQUFNLEVBQUUsQ0FBRjtBQUxLLFdBQWI7QUFPRDtBQUNELGlCQUFTLE9BQVQ7QUFDRCxPQWZEO0FBZ0JEOzs7eUJBRUksRyxFQUFLLEksRUFBTSxRLEVBQVU7QUFDeEIsUUFBRSxJQUFGLENBQU87QUFDTCxhQUFLLEdBREE7QUFFTCxrQkFBVSxNQUZMO0FBR0wsY0FBTSxNQUhEO0FBSUwsY0FBTSxJQUpEO0FBS0wscUJBQWEsSUFMUjtB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QzdDLFdBQUssSUFBTCxDQUFhLElBQWIsYUFBMkI7QUFDekIsZ0JBQVEsSUFEaUI7QUFFekIsa0JBQVU7QUFGZSxPQUEzQixFQUdHLFVBQUMsUUFBRCxFQUFjO0FBQ2YsZ0JBQVEsR0FBUixDQUFZLG1CQUFaO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDQSxjQUFNLElBQU4sRUFBWSxJQUFaO0FBQ0QsT0FQRDtBQVFELEtBVEQsTUFTTztBQUNMLFVBQUksUUFBUSxFQUFSLElBQWMsUUFBUSxFQUExQixFQUNFLEVBQUUsV0FBRixFQUFlLElBQWYsQ0FBb0IsZ0RBQXBCLEVBQXNFLElBQXRFLEdBREYsS0FFSyxJQUFJLFNBQVMsSUFBYixFQUNILEVBQUUsV0FBRixFQUFlLElBQWYsQ0FBb0Isc0VBQXBCLEVBQTRGLElBQTVGO0FBQ0g7QUFDRixHQXBCRDtBQXFCRCxDQTVERCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgaG9zdCA9IHJlcXVpcmUoJy4vaG9zdCcpO1xuXG5jbGFzcyBBamF4IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBnZXRGbHV4KGlkLCBjYWxsYmFjaywgdXJsPWAke2hvc3R9ZmVlZC8ke2lkfWApIHtcbiAgICB0aGlzLmdldCh1cmwsIGNhbGxiYWNrLCAneG1sJyk7XG4gIH1cblxuICBnZXRMaXN0Rmx1eChjYWxsYmFjaywgdXJsPWAke2hvc3R9ZmVlZHMuanNvbmApIHtcbiAgICB0aGlzLmdldCh1cmwsIChyZXNwb25zZSkgPT4ge1xuICAgICAgbGV0IGxpc3QgPSByZXNwb25zZS5mZWVkcyB8fCBbXTtcbiAgICAgIGxldCBsaXN0cmV0ID0gW107XG4gICAgICBmb3IgKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvL1swXSA9PSBpZCAsIFsxXSA9PSB0aXRsZSwgWzJdID09ID8gWzNdID09IGRlc2NyaXB0aW9uLCBbNF0gPT0gZGF0ZVxuICAgICAgICBsZXQgbCA9IGxpc3RbaV07XG4gICAgICAgIGxpc3RyZXQucHVzaCh7XG4gICAgICAgICAgaWQ6IGxbMF0sXG4gICAgICAgICAgdGl0bGU6IGxbMV0sXG4gICAgICAgICAgdW5rbm93OiBsWzJdLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBsWzNdLFxuICAgICAgICAgIGRhdGU6IGxbNF0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2sobGlzdHJldClcbiAgICB9KTtcbiAgfVxuXG4gIHBvc3QodXJsLCBib2R5LCBjYWxsYmFjaykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIGRhdGE6IGJvZHksXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgIHN1Y2Nlc3M6ICh4bWwpID0+IHtcbiAgICAgICAgY2FsbGJhY2soeG1sKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogdGhpcy5lcnJvckhhbmRsZXJcbiAgICB9KTtcbiAgfVxuXG4gIGdldCh1cmwsIGNhbGxiYWNrLCByZXNwb25zZVR5cGU9J2pzb24nKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YVR5cGU6IHJlc3BvbnNlVHlwZSxcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICBzdWNjZXNzOiAoeG1sKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHhtbCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IHRoaXMuZXJyb3JIYW5kbGVyXG4gICAgfSk7XG4gIH1cblxuICBlcnJvckhhbmRsZXIoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQWpheCgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2V4YW1wbGUvJ1xuLy9tb2R1bGUuZXhwb3J0cyA9ICdodHRwOi8vcWNsb2FyZWMuY29tOjgwODAvJ1xuIiwibGV0IGFqYXggPSByZXF1aXJlKCcuL2FqYXgnKTtcbmxldCBob3N0ID0gcmVxdWlyZSgnLi9ob3N0Jyk7XG5cbiQoZnVuY3Rpb24oKSB7XG5cbiAgJCgnI2xvZ2luLWZvcm0tbGluaycpLmNsaWNrKChlKSA9PiB7XG4gICAgJChcIiNsb2dpbi1mb3JtXCIpLmRlbGF5KDEwMCkuZmFkZUluKDEwMCk7XG4gICAgJChcIiNyZWdpc3Rlci1mb3JtXCIpLmZhZGVPdXQoMTAwKTtcbiAgICAkKCcjcmVnaXN0ZXItZm9ybS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gICQoJyNyZWdpc3Rlci1mb3JtLWxpbmsnKS5jbGljaygoZSkgPT4ge1xuICAgICQoXCIjcmVnaXN0ZXItZm9ybVwiKS5kZWxheSgxMDApLmZhZGVJbigxMDApO1xuICAgICQoXCIjbG9naW4tZm9ybVwiKS5mYWRlT3V0KDEwMCk7XG4gICAgJCgnI2xvZ2luLWZvcm0tbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGxvZ2luKHVzZXIsIHBhc3MpIHtcbiAgICBhamF4LnBvc3QoYCR7aG9zdH1zaWduaW5gLCB7XG4gICAgICB1c2VySWQ6IHVzZXIsXG4gICAgICBwYXNzd29yZDogcGFzc1xuICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJjYWxsYmFjayBsb2dpblwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleC5odG1sXCI7XG4gICAgfSk7XG4gIH1cblxuICAkKCcjbG9naW4tZm9ybScpLnN1Ym1pdCgoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXNlciA9ICQoJyNsb2dpbi1mb3JtICN1c2VybmFtZScpLnZhbCgpO1xuICAgIGxldCBwYXNzID0gJCgnI2xvZ2luLWZvcm0gI3Bhc3N3b3JkJykudmFsKCk7XG4gICAgaWYgKHVzZXIgIT0gXCJcIiAmJiBwYXNzICE9IFwiXCIpIHtcbiAgICAgIGxvZ2luKHVzZXIsIHBhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI2Vycm9yQm94XCIpLmh0bWwoJzxzdHJvbmc+VXNlcm5hbWUgYW5kIHBhc3N3b3JkIHJlcXVpcmU8L3N0cm9uZz4nKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAkKCcjcmVnaXN0ZXItZm9ybScpLnN1Ym1pdCgoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXNlciA9ICQoJyNyZWdpc3Rlci1mb3JtICN1c2VybmFtZScpLnZhbCgpO1xuICAgIGxldCBwYXNzID0gJCgnI3JlZ2lzdGVyLWZvcm0gI3Bhc3N3b3JkJykudmFsKCk7XG4gICAgbGV0IHBhc3NjID0gJCgnI3JlZ2lzdGVyLWZvcm0gI2NvbmZpcm0tcGFzc3dvcmQnKS52YWwoKTtcbiAgICBpZiAodXNlciAhPSBcIlwiICYmIHBhc3MgIT0gXCJcIiAmJiBwYXNzYyA9PSBwYXNzKSB7XG4gICAgICBhamF4LnBvc3QoYCR7aG9zdH1zaWdudXBgLCB7XG4gICAgICAgIHVzZXJJZDogdXNlcixcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3NcbiAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxiYWNrIHJlZ2lzdGVyXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIGxvZ2luKHVzZXIsIHBhc3MpO1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHVzZXIgPT0gXCJcIiB8fCBwYXNzID09IFwiXCIpXG4gICAgICAgICQoXCIjZXJyb3JCb3hcIikuaHRtbCgnPHN0cm9uZz5Vc2VybmFtZSBhbmQgcGFzc3dvcmQgcmVxdWlyZTwvc3Ryb25nPicpLnNob3coKTtcbiAgICAgIGVsc2UgaWYgKHBhc3NjICE9IHBhc3MpXG4gICAgICAgICQoXCIjZXJyb3JCb3hcIikuaHRtbCgnPHN0cm9uZz5QYXNzd29yZCBhbmQgcGFzc3dvcmQgY29uZmlybWF0aW9uIG11c3QgYmUgdGhlIHNhbWU8L3N0cm9uZz4nKS5zaG93KCk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl19
