'use strict';
import {Estimate} from '../Estimate.es6';
import {Experiment} from '../Experiment.es6';

class ExperimentRepository {

	save(experiment) {
		localStorage.setItem(experiment.id, experiment.estimates);
	}

	findOrNew(key) {
		const experimentAsString = localStorage.getItem(key);

		if (experimentAsString === null) {
			return new Experiment(key);
		}

		const estimatesArray = experimentAsString.split(',');
		const experiment = new Experiment(key);

		estimatesArray.forEach((estimateString) => {
			const experimentAsInteger = parseInt(estimateString);
			experiment.addEstimate(new Estimate(experimentAsInteger));
		});

		return experiment;
	}

	addEstimate(experimentKey, estimate) {
		const experiment = this.findOrNew(experimentKey);
		experiment.addEstimate(estimate);
		this.save(experiment);
	}

	deleteAll() {
		localStorage.clear();
	}
}

export {ExperimentRepository};