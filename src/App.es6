'use strict';

import {CanvasController} from './CanvasController.es6';
import {Estimate} from './Estimate.es6';
import {StopWatch} from './StopWatch.es6';
import {ExperimentRepository} from './localstorage/ExperimentRepository.es6';
import Symbol from 'es6-symbol';

const canvasController = Symbol();
const experiment = Symbol();
const experimentRepository = Symbol();

class App {
	constructor(appDom) {
		this[canvasController] = setupCanvasController(appDom);
		this[experimentRepository] = new ExperimentRepository();
		this[experiment] = this[experimentRepository].findOrNew('1');

		document.addEventListener('keyup', inputListener(this[experiment], this[canvasController], this[experimentRepository]))
	}
}

function inputListener(experiment, canvasController, experimentRepository) {
	const stopWatch = new StopWatch();
	const spacebar = 32;
	const waitingForNewEstimate = 0;
	const estimateInProgress = 1;
	const showEstimates = 2;

	let drawingIntervalId, elapsedMillis;
	let currentState = waitingForNewEstimate;

	return (event) => {
		if(event.keyCode === spacebar) {
			if (currentState === waitingForNewEstimate) {
				stopWatch.start();
				canvasController.clearCanvas();
				drawingIntervalId = canvasController.startVerticalLine();
				currentState = estimateInProgress;
			} else if (currentState === estimateInProgress) {
				elapsedMillis = stopWatch.stop();
				clearInterval(drawingIntervalId);
				drawingIntervalId = undefined;
				experiment.addEstimate(new Estimate(elapsedMillis));
				experimentRepository.save(experiment);
				currentState = showEstimates;
			} else if (currentState === showEstimates) {
				canvasController.clearCanvas();
				canvasController.drawExperiment(experiment);
				currentState = waitingForNewEstimate;
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