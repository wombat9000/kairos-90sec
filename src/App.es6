'use strict';

import {CanvasController} from './CanvasController.es6';
import Symbol from 'es6-symbol';

const canvasController = Symbol();

class App {
	constructor(appDom) {
		this[canvasController] = setupCanvasController(appDom);

		document.addEventListener('keyup', startExperiment(this[canvasController]))
	}
}

function startExperiment(canvasController) {
	let drawingIntervalId, start, elapsedSeconds;

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
				elapsedSeconds = (new Date().getTime() - start)/1000;
				clearInterval(drawingIntervalId);
				drawingIntervalId = undefined;

				console.log(elapsedSeconds);
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