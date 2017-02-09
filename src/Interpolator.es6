'use strict';

class Interpolator {

	static interpolate(from, to, distanceRatio) {
		const interpolated = from + (to-from) * distanceRatio;
		return Math.round(interpolated);
	}

}

export {Interpolator};