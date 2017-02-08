'use strict';
import {ExperimentRepository} from '../../src/localstorage/EstimateRepository.es6';
import {Estimate} from '../../src/Estimate.es6';
import {Experiment} from '../../src/Experiment.es6';

describe('ExperimentRepository', () => {

	it('should store and retrieve an experiment with one estimate', function () {
		const someEstimate = new Estimate(10);
		const someExperiment = new Experiment();

		someExperiment.addEstimate(someEstimate);

		const testee = new ExperimentRepository();

		testee.create(someExperiment);

		const result = testee.findByKey('1');

		expect(result.estimates[0].millis).to.equal(someExperiment.estimates[0].millis);
	})
});
