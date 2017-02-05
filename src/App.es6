'use strict';

import {InstanceProvider} from "./InstanceProvider.es6";
import Symbol from 'es6-symbol';

const canvasController = Symbol();

class App {
	constructor(appDom) {
		this[canvasController] = setupCanvasController(appDom);
	}
}

function setupCanvasController(appDom) {
	const canvas = document.createElement('canvas');
	appDom.appendChild(canvas);
	return InstanceProvider.getCanvasController(canvas);
}

export {App};