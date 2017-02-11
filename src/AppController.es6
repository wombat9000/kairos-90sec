'use strict';

import {Estimate} from './Estimate.es6';
import Symbol from 'es6-symbol';

const canvasController = Symbol();
const experimentRepository = Symbol();
const stopWatch = Symbol();
const activeExperiment = Symbol();

const maxExperiments = 34;


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
		const xPos = this[activeExperiment].nextEstimateStartPos();
		this[stopWatch].start();
		return this[canvasController].startVerticalLine(xPos);
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
		if(this[activeExperiment].estimates.length < maxExperiments) {
			this[activeExperiment].addEstimate(estimate);
			this[experimentRepository].saveExperiment(this[activeExperiment]);
		}
	}

	clearStorage() {
		this[experimentRepository].deleteAll();
		this[activeExperiment] = this[experimentRepository].findOrNew('1');
		this[canvasController].clearCanvas();
	}

	proceedToNextExperiment() {
		const nextId = '' + (parseInt(this[activeExperiment].id) + 1);
		this[activeExperiment] = this[experimentRepository].findOrNew(nextId);
	}

	inputListener() {
		const spacebar = 32;
		const q = 81;
		const t = 84;
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

			if (currentState === waitingForNewEstimate) {
				if (event.keyCode === q) {
					this.clearStorage();
				}

				if (event.keyCode === t) {
					// this.proceedToNextExperiment();
				}
			}
		}
	}
}

export {AppController};