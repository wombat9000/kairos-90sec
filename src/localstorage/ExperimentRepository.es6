'use strict';
import {Estimate} from '../Estimate.es6';
import {Experiment} from '../Experiment.es6';

class ExperimentRepository {

	saveExperiment(experiment) {
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
		this.saveExperiment(experiment);
		this.addToAllEstimates(estimate);
	}

	addToAllEstimates(estimate) {
		const experiment = this.findOrNew('allEstimates');
		experiment.addEstimate(estimate);
		this.saveExperiment(experiment);
	}

	getAllEstimates() {
		return this.findOrNew('allEstimates');
	}

	deleteAll() {
		localStorage.clear();
	}
}

export {ExperimentRepository};