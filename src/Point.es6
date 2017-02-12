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

	distanceTo(anotherPoint) {
		const xDistance = Math.abs(this.x - anotherPoint.x);
		const yDistance = Math.abs(this.y - anotherPoint.y);

		return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	}

	findPointByAngle(angleInDegrees, length) {
		const radians = angleInDegrees * Math.PI / 180;
		const xOffset = length * Math.cos(radians);
		const yOffset = length * Math.sin(radians);

		return new Point(Math.round(this.x + xOffset), Math.round(this.y + yOffset));
	}
}

export {Point};