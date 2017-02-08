'use strict';

import Symbol from 'es6-symbol';
const start = Symbol();

class StopWatch {

	start() {
		this[start] = new Date().getTime();
	}

	stop() {
		const end = new Date().getTime();
		const elapsedMillis = end - this[start];
		this[start] = 0;

		return elapsedMillis;
	}
}

export {StopWatch};