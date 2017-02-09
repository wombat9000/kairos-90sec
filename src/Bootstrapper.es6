'use strict';

import {CanvasController} from './CanvasController.es6';
import {StopWatch} from './StopWatch.es6';
import {ExperimentRepository} from './localstorage/ExperimentRepository.es6';
import {AppController} from './AppController.es6';

let createCanvas = function () {
	const canvas = document.createElement('canvas');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	return canvas;
};

class Bootstrapper {
	constructor(appDom) {
		const canvas = createCanvas();

		appDom.appendChild(canvas);

		const stopWatch = new StopWatch();
		const canvasController =  new CanvasController(canvas);
		const experimentRepository = new ExperimentRepository();

		const appController = new AppController(canvasController, experimentRepository, stopWatch);

		document.addEventListener('keyup', appController.inputListener());
	}
}

export {Bootstrapper};