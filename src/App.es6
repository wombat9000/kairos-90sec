'use strict';

import {CanvasController} from './CanvasController.es6';
import {Experiment} from './Experiment.es6';
import {Estimate} from './Estimate.es6';
import Symbol from 'es6-symbol';

const canvasController = Symbol();
const experiment = Symbol();

class App {
	constructor(appDom) {
		this[canvasController] = setupCanvasController(appDom);
		this[experiment] = new Experiment();

		document.addEventListener('keyup', toggleAppState(this[experiment], this[canvasController]))
	}
}

function toggleAppState(experiment, canvasController) {
	const spacebar = 32;
	const waitingForNewEstimate = 0;
	const estimateInProgress = 1;
	const showEstimates = 2;

	let drawingIntervalId, start, elapsedMillis;
	let currentState = waitingForNewEstimate;

	return (event) => {
		if(event.keyCode === spacebar) {
			if (currentState === waitingForNewEstimate) {
				start = new Date().getTime();
				canvasController.clearCanvas();
				drawingIntervalId = canvasController.startVerticalLine();
				currentState = estimateInProgress;
			} else if (currentState === estimateInProgress) {
				elapsedMillis = new Date().getTime() - start;
				clearInterval(drawingIntervalId);
				drawingIntervalId = undefined;
				experiment.addEstimate(new Estimate(elapsedMillis));
				currentState = showEstimates;
			} else if (currentState === showEstimates) {
				canvasController.clearCanvas();
				canvasController.drawExperiment(experiment);
				currentState = 0;
			}
		}
	}
}

function setupCanvasController(appDom) {
	const canvas = document.createElement('canvas');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	appDom.appendChild(canvas);
	return new CanvasController(canvas);
}

export {App};