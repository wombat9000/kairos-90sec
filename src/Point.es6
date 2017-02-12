'use strict';

import Symbol from 'es6-symbol';
const x = Symbol();
const y = Symbol();

class Point {
	constructor(_x, _y) {
		this[x] = _x;
		this[y] = _y;
	}

	get x() {
		return this[x];
	}

	get y() {
		return this[y];
	}

	distanceTo(other) {
		const deltaX = Math.abs(this.x - other.x);
		const deltaY = Math.abs(this.y - other.y);

		return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	}

	findPointByAngle(angleInDegrees, length) {
		const radians = angleInDegrees * Math.PI / 180;
		const xOffset = length * Math.cos(radians);
		const yOffset = length * Math.sin(radians);

		return new Point(Math.round(this.x + xOffset), Math.round(this.y + yOffset));
	}

	interpolateTo(target) {
		const deltaX = target.x - this.x;
		const deltaY = target.y - this.y;

		const angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

		return this.findPointByAngle(angleInDegrees, 1);
	}
}

export {Point};