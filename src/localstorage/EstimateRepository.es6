'use strict';
import {Estimate} from '../Estimate.es6';
import {Experiment} from '../Experiment.es6';

class ExperimentRepository {

	create(experiment) {

		localStorage.setItem('1', experiment.estimates);
	}

	findByKey(key) {
		const experimentAsString = localStorage.getItem(key);

		const experimentAsInteger = parseInt(experimentAsString);

		const experiment = new Experiment();
		experiment.addEstimate(new Estimate(experimentAsInteger));

		return experiment;
	}
}

export {ExperimentRepository};