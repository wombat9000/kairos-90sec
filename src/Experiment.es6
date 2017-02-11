'use strict';

import Symbol from 'es6-symbol';

const estimates = Symbol();
const id = Symbol();

const centerOfScreen = document.body.clientWidth/2;
const lineWidth = 8;
const resultsLineSpacing = 26;

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

	nextEstimateStartPos() {
		const numLines = this.estimates.length;
		const firstX = centerOfScreen - (resultsLineSpacing/2) - (lineWidth/2);

		const offset = (Math.round(numLines/2) * resultsLineSpacing);

		if (numLines % 2) {
			// right side
			return firstX + offset;
		} else {
			// left side
			return firstX - offset;
		}
	}
}

export {Experiment};