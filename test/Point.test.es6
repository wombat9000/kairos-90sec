'use strict';

import {Point} from '../src/Point.es6';


describe('Point', function () {

	describe('- calculates distance between itself and another point', function () {
		it('should calculate vertical distance', function () {
			const startPoint = new Point(0, 0);
			const endPoint = new Point(0, 1);

			const result = startPoint.distanceTo(endPoint);

			expect(result).to.equal(1);
		});

		it('should calculate horizontal distance', function () {
			const startPoint = new Point(1, 0);
			const endPoint = new Point(5, 0);

			const result = startPoint.distanceTo(endPoint);

			expect(result).to.equal(4);
		});
	});

	describe('- calculates a new points given angle in degrees and distance', function () {

		it('should find point at 90 degrees', function () {
		    const testee = new Point(0, 0);

		    const result = testee.findPointByAngle(90, 100);

		    expect(result.x).to.equal(0);
		    expect(result.y).to.equal(100);
		});
	});
});