'use strict';

import Symbol from 'es6-symbol';
const start = Symbol();

class StopWatch {

	start() {
		this[start] = new Date().getTime();
	}

	stop() {
		return new Date().getTime() - this[start];
	}
}

export {StopWatch};