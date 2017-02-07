'use strict';

import {Utils} from '../src/Utils.es6';


describe('Utils', () => {

	describe('- interpolation', () => {

		it('should interpolate between 1 and 3 at 0.5', () => {
			const result = Utils.interpolate(1, 3, 0.5);

			expect(result).to.equal(2);
		});

		it('should interpolate between 0 and 100 at 0.5', () => {
			const result = Utils.interpolate(0, 100, 0.5);

			expect(result).to.equal(50);
		});

		it('should interpolate between 100 and 0 at 0.5', () => {
			const result = Utils.interpolate(100, 0, 0.5);

			expect(result).to.equal(50);
		});

		it('should round to integer', () => {
			const result = Utils.interpolate(100, 0, 0.666);

			expect(result).to.equal(33);
		});
	});
});