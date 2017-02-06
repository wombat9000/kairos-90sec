'use strict';

import {CanvasController} from './CanvasController.es6';
import {Experiment} from './Experiment.es6';
import {Line} from './Line.es6';
import Symbol from 'es6-symbol';

const canvasController = Symbol();
const experiment = Symbol();

class App {
	constructor(appDom) {
		this[canvasController] = setupCanvasController(appDom);
		this[experiment] = new Experiment();

		document.addEventListener('keyup', startRun(this[experiment], this[canvasController]))
	}
}

function startRun(experiment, canvasController) {
	let drawingIntervalId, start, elapsedMillis;

	let state = 0;

	const spaceBarPress = function (keyCode) {
		return keyCode === 32;
	};

	return (event) => {
		if(spaceBarPress(event.keyCode)) {
			if (state === 0) {
				start = new Date().getTime();
				canvasController.clearCanvas();
				drawingIntervalId = canvasController.startVerticalLine();
				state = 1;
			} else if (state === 1) {
				elapsedMillis = new Date().getTime() - start;
				clearInterval(drawingIntervalId);
				drawingIntervalId = undefined;
				experiment.addLine(new Line(elapsedMillis));
				state = 2;
			} else if (state === 2) {
				canvasController.clearCanvas();
				canvasController.drawExperiment(experiment);
				state = 0;
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