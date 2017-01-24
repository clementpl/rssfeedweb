(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.M = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(function () {

  $('#login-form-link').click(function (e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
  $('#register-form-link').click(function (e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
});

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLEVBQUUsWUFBVzs7QUFFWCxJQUFFLGtCQUFGLEVBQXNCLEtBQXRCLENBQTRCLFVBQVMsQ0FBVCxFQUFZO0FBQ3RDLE1BQUUsYUFBRixFQUFpQixLQUFqQixDQUF1QixHQUF2QixFQUE0QixNQUE1QixDQUFtQyxHQUFuQztBQUNBLE1BQUUsZ0JBQUYsRUFBb0IsT0FBcEIsQ0FBNEIsR0FBNUI7QUFDQSxNQUFFLHFCQUFGLEVBQXlCLFdBQXpCLENBQXFDLFFBQXJDO0FBQ0EsTUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixRQUFqQjtBQUNBLE1BQUUsY0FBRjtBQUNELEdBTkQ7QUFPQSxJQUFFLHFCQUFGLEVBQXlCLEtBQXpCLENBQStCLFVBQVMsQ0FBVCxFQUFZO0FBQ3pDLE1BQUUsZ0JBQUYsRUFBb0IsS0FBcEIsQ0FBMEIsR0FBMUIsRUFBK0IsTUFBL0IsQ0FBc0MsR0FBdEM7QUFDQSxNQUFFLGFBQUYsRUFBaUIsT0FBakIsQ0FBeUIsR0FBekI7QUFDQSxNQUFFLGtCQUFGLEVBQXNCLFdBQXRCLENBQWtDLFFBQWxDO0FBQ0EsTUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixRQUFqQjtBQUNBLE1BQUUsY0FBRjtBQUNELEdBTkQ7QUFRRCxDQWpCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIkKGZ1bmN0aW9uKCkge1xuXG4gICQoJyNsb2dpbi1mb3JtLWxpbmsnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgJChcIiNsb2dpbi1mb3JtXCIpLmRlbGF5KDEwMCkuZmFkZUluKDEwMCk7XG4gICAgJChcIiNyZWdpc3Rlci1mb3JtXCIpLmZhZGVPdXQoMTAwKTtcbiAgICAkKCcjcmVnaXN0ZXItZm9ybS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gICQoJyNyZWdpc3Rlci1mb3JtLWxpbmsnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgJChcIiNyZWdpc3Rlci1mb3JtXCIpLmRlbGF5KDEwMCkuZmFkZUluKDEwMCk7XG4gICAgJChcIiNsb2dpbi1mb3JtXCIpLmZhZGVPdXQoMTAwKTtcbiAgICAkKCcjbG9naW4tZm9ybS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbn0pO1xuIl19
