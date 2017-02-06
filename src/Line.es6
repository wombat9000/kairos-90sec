'use strict';

import Symbol from 'es6-symbol';
const millis = Symbol();

class Line {
	constructor(_millis) {
		this[millis] = _millis;
	}

	toString() {
		return '' + this[millis];
	}

	get millis() {
		return this[millis];
	}
}

export {Line};
