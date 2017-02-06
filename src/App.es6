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

	const spaceBarPress = function (keyCode) {
		return keyCode === 32;
	};

	return (event) => {
		if(spaceBarPress(event.keyCode)) {
			if (drawingIntervalId === undefined) {
				start = new Date().getTime();
				canvasController.clearCanvas();
				drawingIntervalId = canvasController.startVerticalLine();
			} else {
				elapsedMillis = new Date().getTime() - start;
				clearInterval(drawingIntervalId);
				drawingIntervalId = undefined;
				experiment.addLine(new Line(elapsedMillis));
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