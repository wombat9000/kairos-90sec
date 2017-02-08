'use strict';

import {Utils} from '../src/Utils.es6';
import Symbol from 'es6-symbol';

const millis = Symbol();

class Estimate {
	constructor(_millis) {
		this[millis] = _millis;
	}

	toString() {
		return '' + this[millis];
	}

	get millis() {
		return this[millis];
	}

	get color() {
		const redMiss = 191;
		const greenMiss = 114;
		const blueMiss = 48;
		const redTarget = 29;
		const greenTarget = 112;
		const blueTarget = 116;

		const maxRed = 'rgb(191, 114, 48)';

		const maxOffset = 5000;
		const target = 10000;

		const miss = Math.round(Math.abs(target - this[millis]));

		if (maxOffset < miss)  {
			return maxRed;
		}

		const ratio = miss/maxOffset;

		const red = Utils.interpolate(redTarget, redMiss, ratio);
		const green = Utils.interpolate(greenTarget, greenMiss, ratio);
		const blue = Utils.interpolate(blueTarget, blueMiss, ratio);

		return 'rgb('+ red +', ' + green +', ' + blue + ')';
	}
}

export {Estimate};
