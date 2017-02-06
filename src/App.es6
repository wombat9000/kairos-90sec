'use strict';

import {CanvasController} from './CanvasController.es6';
import Symbol from 'es6-symbol';

const canvasController = Symbol();

class App {
	constructor(appDom) {
		this[canvasController] = setupCanvasController(appDom);
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