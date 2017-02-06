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

	interpolate(base, target, ratio) {
		console.log('base', base, 'target', target, 'ratio', ratio);

		const interpolated = base + (target-base) * ratio;
		console.log('result', interpolated);
		return Math.round(interpolated);
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

		console.log('offset', maxOffset, 'miss', miss);

		if (maxOffset < miss)  {
			return maxRed;
		}

		const ratio = miss/maxOffset;

		const red = this.interpolate(redTarget, redMiss, ratio);
		const green = this.interpolate(greenTarget, greenMiss, ratio);
		const blue = this.interpolate(blueTarget, blueMiss, ratio);

		return 'rgb('+ red +', ' + green +', ' + blue + ')';
	}
}

export {Line};
