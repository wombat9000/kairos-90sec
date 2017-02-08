'use strict';

import Symbol from 'es6-symbol';

const estimates = Symbol();

class Experiment {
	constructor() {
		this[estimates] = [];
	}

	addEstimate(estimate) {
		this[estimates].push(estimate);
	}

	get estimates() {
		return this[estimates];
	}
}

export {Experiment};