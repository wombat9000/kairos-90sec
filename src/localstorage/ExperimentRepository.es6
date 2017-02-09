'use strict';
import {Estimate} from '../Estimate.es6';
import {Experiment} from '../Experiment.es6';

class ExperimentRepository {

	save(experiment) {
		localStorage.setItem('1', experiment.estimates);
	}

	findOrNew(key) {
		const experimentAsString = localStorage.getItem(key);

		if (experimentAsString === null) {
			return new Experiment();
		}

		const estimatesArray = experimentAsString.split(',');
		const experiment = new Experiment();

		estimatesArray.forEach((estimateString) => {
			const experimentAsInteger = parseInt(estimateString);
			experiment.addEstimate(new Estimate(experimentAsInteger));
		});

		return experiment;
	}

	deleteAll() {
		localStorage.clear();
	}
}

export {ExperimentRepository};