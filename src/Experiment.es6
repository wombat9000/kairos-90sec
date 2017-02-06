'use strict';

import Symbol from 'es6-symbol';

const lines = Symbol();

class Experiment {
	constructor() {
		this[lines] = [];
	}

	addLine(line) {
		this[lines].push(line);

		this[lines].forEach((line) => {
			console.log(line.toString());
		})
	}
}

export {Experiment};