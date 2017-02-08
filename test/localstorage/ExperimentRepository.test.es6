'use strict';
import {ExperimentRepository} from '../../src/localstorage/ExperimentRepository.es6';
import {Estimate} from '../../src/Estimate.es6';
import {Experiment} from '../../src/Experiment.es6';

describe('ExperimentRepository', () => {

	beforeEach(() => {
		localStorage.clear();
	});

	it('should store and retrieve an experiment with one estimate', function () {
		const someEstimate = new Estimate(10);
		const someExperiment = new Experiment();

		someExperiment.addEstimate(someEstimate);

		const testee = new ExperimentRepository();

		testee.create(someExperiment);

		const result = testee.findByKey('1');

		expect(result.estimates.length).to.equal(1);
		expect(result.estimates[0].millis).to.equal(someExperiment.estimates[0].millis);
	});

	it('should store and retrieve an experiment with two estimates', function () {
		const someEstimate = new Estimate(10);
		const anotherEstimate = new Estimate(15);
		const someExperiment = new Experiment();

		someExperiment.addEstimate(someEstimate);
		someExperiment.addEstimate(anotherEstimate);

		const testee = new ExperimentRepository();

		testee.create(someExperiment);

		const result = testee.findByKey('1');

		expect(result.estimates.length).to.equal(2);
		expect(result.estimates[0].millis).to.equal(someExperiment.estimates[0].millis);
		expect(result.estimates[1].millis).to.equal(someExperiment.estimates[1].millis);
	});
});