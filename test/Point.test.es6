'use strict';

import {Point} from '../src/Point.es6';


describe('Point', function () {
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