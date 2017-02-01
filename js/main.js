(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var xCenter = canvas.width / 2;

var startY = 0;

var destY = startY + 1;

var blue = 0;

var callback1 = function callback1() {
	var cursor = canvas.getContext('2d');
	cursor.beginPath();

	cursor.moveTo(xCenter, startY);
	cursor.lineTo(xCenter, destY);
	cursor.lineWidth = 15;
	cursor.strokeStyle = 'rgb(0, 0, ' + blue + ')';
	cursor.stroke();
	destY++;
	blue += 2;
};

setInterval(callback1, 35);

var red = 0;
var destY2 = startY + 1;

var callback2 = function callback2() {
	var cursor = canvas.getContext('2d');
	cursor.beginPath();

	cursor.moveTo(xCenter + 30, startY);
	cursor.lineTo(xCenter + 30, destY2);
	cursor.lineWidth = 15;
	cursor.strokeStyle = 'rgb(0, ' + red + ', 0)';
	cursor.stroke();
	destY2++;
	red += 2;
};

setInterval(callback2, 44);

},{}]},{},[1]);
