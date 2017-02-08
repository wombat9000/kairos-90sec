'use strict';
import {Estimate} from '../Estimate.es6';
import {Experiment} from '../Experiment.es6';

class ExperimentRepository {

	create(experiment) {

		localStorage.setItem('1', experiment.estimates);
	}

	findByKey(key) {
		const experimentAsString = localStorage.getItem(key);
		const estimatesArray = experimentAsString.split(',');
		const experiment = new Experiment();

		estimatesArray.forEach((estimateString) => {
			const experimentAsInteger = parseInt(estimateString);
			experiment.addEstimate(new Estimate(experimentAsInteger));
		});

		return experiment;
	}
}

export {ExperimentRepository};