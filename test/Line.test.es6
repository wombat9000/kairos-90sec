'use strict';

import {Line} from '../src/Line.es6';

describe('Line', function () {
	let testee;

	beforeEach(() => {

		testee = new Line(10);
	});

	describe('- interpolates', () => {
		it('should interpolate between 1 and 3 at 0.5', () => {
		    const result = testee.interpolate(1, 3, 0.5);

		    expect(result).to.equal(2);
		});

		it('should interpolate between 0 and 100 at 0.5', () => {
			const result = testee.interpolate(0, 100, 0.5);

			expect(result).to.equal(50);
		});

		it('should interpolate between 100 and 0 at 0.5', () => {
			const result = testee.interpolate(100, 0, 0.5);

			expect(result).to.equal(50);
		});

		it('should rount to integer', () => {
			const result = testee.interpolate(100, 0, 0.666);

			expect(result).to.equal(33);
		});
	});
});