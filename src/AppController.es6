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

	startNewEstimate(lineNum) {
		this[canvasController].clearCanvas();
		this[stopWatch].start();
		return this[canvasController].startEstimateDrawing(lineNum);
	}

	concludeEstimate(estimateDrawingIntervalId) {
		const elapsedMillis = this[stopWatch].stop();
		clearInterval(estimateDrawingIntervalId);
		return new Estimate(elapsedMillis);
	}

	showResultsCubic(experiment) {
		this[canvasController].clearCanvas();
		this[canvasController].drawExperimentCubic(experiment);
	}

	showResultsLinear(experiment) {
		this[canvasController].clearCanvas();
		this[canvasController].drawExperimentLinear(experiment);
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

		const cubic = 0;
		const linear = 1;

		let display = cubic;

		let drawingIntervalId;
		let currentState = waitingForNewEstimate;
		let lineNum = this[activeExperiment].estimates.length;

		return (event) => {
			console.log(event.keyCode);

			if(event.keyCode === spacebar) {
				if (currentState === waitingForNewEstimate) {
					lineNum++;
					drawingIntervalId = this.startNewEstimate(lineNum);
					currentState = estimateInProgress;
				} else if (currentState === estimateInProgress) {
					let estimate = this.concludeEstimate(drawingIntervalId);
					this.addEstimateToCurrentExperiment(estimate);
					currentState = showEstimates;
				} else if (currentState === showEstimates) {
					if(display === linear) {
						this.showResultsLinear(this[activeExperiment]);
						currentState = waitingForNewEstimate;
					} else {
						this.showResultsCubic(this[activeExperiment]);
						currentState = waitingForNewEstimate;
					}

				}
			}

			if (currentState === waitingForNewEstimate) {
				if (event.keyCode === q) {
					this.clearStorage();
				}

				if (event.keyCode === t) {
					if(display === linear) {
						display = cubic;
						this.showResultsCubic(this[activeExperiment]);
						currentState = waitingForNewEstimate;
					} else {
						display = linear;
						this.showResultsLinear(this[activeExperiment]);
						currentState = waitingForNewEstimate;
					}				}
			}
		}
	}
}

export {AppController};