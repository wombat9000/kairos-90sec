'use strict';

import Symbol from 'es6-symbol';

const estimates = Symbol();
const id = Symbol();


class Experiment {
	constructor(_id) {
		this[id] = _id;
		this[estimates] = [];
	}

	addEstimate(estimate) {
		this[estimates].push(estimate);
	}

	get id() {
		return this[id];
	}

	get estimates() {
		return this[estimates];
	}
}

export {Experiment};