'use strict';

import Symbol from 'es6-symbol';

const lines = Symbol();

class Experiment {
	constructor() {
		this[lines] = [];
	}

	addLine(line) {
		this[lines].push(line);
	}

	get lines() {
		return this[lines];
	}
}

export {Experiment};