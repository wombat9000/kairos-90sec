'use strict';

import {StopWatch} from '../src/StopWatch.es6';



describe('StopWatch', () => {

	let now;
	let clock;

	beforeEach(() => {
		now = new Date();
		clock = sinon.useFakeTimers(now.getTime());
	});

	afterEach(() => {
		clock.restore();
	});

	it('should stop time', () => {
	    const testee = new StopWatch();

	    testee.start();

		clock.tick(500);
		const elapsedMillis = testee.stop();

		expect(elapsedMillis).to.equal(500);
	});
});