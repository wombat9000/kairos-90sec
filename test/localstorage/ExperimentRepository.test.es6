'use strict';
import {ExperimentRepository} from '../../src/localstorage/ExperimentRepository.es6';
import {Estimate} from '../../src/Estimate.es6';
import {Experiment} from '../../src/Experiment.es6';

describe('ExperimentRepository', () => {

	let testee;

	beforeEach(() => {
		localStorage.clear();
		testee = new ExperimentRepository();
	});

	it('should store and retrieve an experiment with one estimate', function () {
		const someEstimate = new Estimate(10);
		const someExperiment = new Experiment('1');

		someExperiment.addEstimate(someEstimate);

		testee.save(someExperiment);

		const result = testee.findOrNew('1');

		expect(result.estimates.length).to.equal(1);
		expect(result.estimates[0].millis).to.equal(someExperiment.estimates[0].millis);
	});

	it('should store and retrieve an experiment with two estimates', function () {
		const someEstimate = new Estimate(10);
		const anotherEstimate = new Estimate(15);
		const someExperiment = new Experiment('1');
		someExperiment.addEstimate(someEstimate);
		someExperiment.addEstimate(anotherEstimate);

		testee.save(someExperiment);
		const result = testee.findOrNew('1');

		expect(result.estimates.length).to.equal(2);
		expect(result.estimates[0].millis).to.equal(someExperiment.estimates[0].millis);
		expect(result.estimates[1].millis).to.equal(someExperiment.estimates[1].millis);
	});

	it('should return an empty experiment if nothing was found', function () {
		const result = testee.findOrNew('1');

		expect(result.estimates.length).to.equal(0);
	});

	it('should delete all experiments', () => {
		const someEstimate = new Estimate(10);
		const anotherEstimate = new Estimate(15);
		const someExperiment = new Experiment('1');
		someExperiment.addEstimate(someEstimate);
		someExperiment.addEstimate(anotherEstimate);

		testee.save(someExperiment);

		let result = localStorage.getItem('1');
		expect(result).to.equal('10,15');

		testee.deleteAll();

		result = localStorage.getItem('1');

		expect(result).to.equal(null);
	});
});
