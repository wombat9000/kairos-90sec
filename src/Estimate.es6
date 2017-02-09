'use strict';

import {Interpolator} from './Interpolator.es6';
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
		const redUnder = 191;
		const greenUnder = 114;
		const blueUnder = 48;
		const redOver = 29;
		const greenOver = 112;
		const blueOver = 116;

		const maxRed = 'rgb(191, 114, 48)';
		const maxPetrol = 'rgb(29, 112, 116)';

		const maxMiss = 5000;
		const target = 10000;

		const miss = Math.round(Math.abs(target - this[millis]));
		const ratio = miss/maxMiss;

		if (this[millis] > target) {
			// interpolate petrol
			if (miss > maxMiss) {
				return maxPetrol;
			}
			const red = Interpolator.interpolate(255, redOver, ratio);
			const green = Interpolator.interpolate(255, greenOver, ratio);
			const blue = Interpolator.interpolate(255, blueOver, ratio);
			return 'rgb('+ red +', ' + green +', ' + blue + ')';

		} else {
			// interpolate red
			if (miss > maxMiss) {
				return maxRed;
			}
			const red = Interpolator.interpolate(255, redUnder, ratio);
			const green = Interpolator.interpolate(255, greenUnder, ratio);
			const blue = Interpolator.interpolate(255, blueUnder, ratio);
			return 'rgb('+ red +', ' + green +', ' + blue + ')';
		}
	}
}

export {Estimate};
