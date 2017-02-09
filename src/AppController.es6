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

	inputListener() {
		const spacebar = 32;
		const waitingForNewEstimate = 0;
		const estimateInProgress = 1;
		const showEstimates = 2;

		let drawingIntervalId, elapsedMillis;
		let currentState = waitingForNewEstimate;

		return (event) => {
			if(event.keyCode === spacebar) {
				if (currentState === waitingForNewEstimate) {
					this[stopWatch].start();
					this[canvasController].clearCanvas();
					drawingIntervalId = this[canvasController].startVerticalLine();
					currentState = estimateInProgress;
				} else if (currentState === estimateInProgress) {
					elapsedMillis = this[stopWatch].stop();
					clearInterval(drawingIntervalId);
					drawingIntervalId = undefined;
					this[activeExperiment].addEstimate(new Estimate(elapsedMillis));
					this[experimentRepository].save(this[activeExperiment]);
					currentState = showEstimates;
				} else if (currentState === showEstimates) {
					this[canvasController].clearCanvas();
					this[canvasController].drawExperiment(this[activeExperiment]);
					currentState = waitingForNewEstimate;
				}
			}
		}
	}
}

export {AppController};