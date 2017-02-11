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
}

export {Point};