'use strict';

import {Interpolator} from '../src/Interpolator.es6';

describe('Interpolator', () => {
	describe('- interpolation', () => {
		it('should interpolate the middle', () => {
			const result = Interpolator.interpolate(1, 3, 0.5);

			expect(result).to.equal(2);
		});

		it('should interpolate to a smaller number', () => {
			const result = Interpolator.interpolate(10, 0, 0.6);

			expect(result).to.equal(4);
		});

		it('should interpolate to a larger number', () => {
			const result = Interpolator.interpolate(0, 10, 0.6);

			expect(result).to.equal(6);
		});

		it('should round to nearest integer', () => {
			const result = Interpolator.interpolate(100, 0, 0.666);

			expect(result).to.equal(33);
		});
	});
});