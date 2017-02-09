'use strict';

import {Estimate} from './Estimate.es6';
import Symbol from 'es6-symbol';

const canvasController = Symbol();
const experimentRepository = Symbol();
const stopWatch = Symbol();
const activeExperiment = Symbol();

class AppController {

	constructor(_canvasController,
	            _experimentRepository,
	            _stopWatch) {
		this[canvasController] = _canvasController;
		this[experimentRepository] = _experimentRepository;
		this[stopWatch] = _stopWatch;
		this[activeExperiment] = this[experimentRepository].findOrNew('1');
	}

	startNewEstimate() {
		this[canvasController].clearCanvas();
		this[stopWatch].start();
		return this[canvasController].startVerticalLine();
	}

	concludeEstimate(estimateDrawingIntervalId) {
		const elapsedMillis = this[stopWatch].stop();
		clearInterval(estimateDrawingIntervalId);
		return new Estimate(elapsedMillis);
	}

	showResults(experiment) {
		this[canvasController].clearCanvas();
		this[canvasController].drawExperiment(experiment);
	}

	addEstimateToCurrentExperiment(estimate) {
		this[activeExperiment].addEstimate(estimate);
		this[experimentRepository].save(this[activeExperiment]);
	}

	clearStorage() {
		this[experimentRepository].deleteAll();
		this[activeExperiment] = this[experimentRepository].findOrNew('1');
	}

	inputListener() {
		const spacebar = 32;
		const q = 81;
		const waitingForNewEstimate = 0;
		const estimateInProgress = 1;
		const showEstimates = 2;

		let drawingIntervalId;
		let currentState = waitingForNewEstimate;

		return (event) => {
			console.log(event.keyCode);
			if(event.keyCode === spacebar) {
				if (currentState === waitingForNewEstimate) {
					drawingIntervalId = this.startNewEstimate();
					currentState = estimateInProgress;
				} else if (currentState === estimateInProgress) {
					let estimate = this.concludeEstimate(drawingIntervalId);
					this.addEstimateToCurrentExperiment(estimate);
					currentState = showEstimates;
				} else if (currentState === showEstimates) {
					this.showResults(this[activeExperiment]);
					currentState = waitingForNewEstimate;
				}
			}

			if (event.keyCode == q) {
				this.clearStorage();
			}
		}
	}
}

export {AppController};