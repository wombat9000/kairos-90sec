(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var cursor = canvas.getContext('2d');

cursor.beginPath();

var xCenter = canvas.width / 2;

var startY = 0;
cursor.moveTo(xCenter, startY);

var destY = startY + 1;

var callback = function callback() {
	cursor.lineTo(xCenter, destY);
	cursor.lineWidth = 15;
	cursor.stroke();
	destY++;

	// ctx.strokeStyle = "black";
	// ctx.moveTo(point.startX, point.startY);
	// ctx.lineTo(point.startX1, point.startY1);
	// ctx.stroke();
};

setInterval(callback, 200);

},{}]},{},[1]);
