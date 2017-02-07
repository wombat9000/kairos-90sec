'use strict';

import {Utils} from '../src/Utils.es6';

describe('Utils', () => {
	describe('- interpolation', () => {
		it('should interpolate the middle', () => {
			const result = Utils.interpolate(1, 3, 0.5);

			expect(result).to.equal(2);
		});

		it('should interpolate to a smaller number', () => {
			const result = Utils.interpolate(10, 0, 0.6);

			expect(result).to.equal(4);
		});

		it('should interpolate to a larger number', () => {
			const result = Utils.interpolate(0, 10, 0.6);

			expect(result).to.equal(6);
		});

		it('should round to nearest integer', () => {
			const result = Utils.interpolate(100, 0, 0.666);

			expect(result).to.equal(33);
		});
	});
});