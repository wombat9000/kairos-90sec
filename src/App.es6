'use strict';



import {InstanceProvider} from "./InstanceProvider.es6";
import Symbol from 'es6-symbol';

class App {
	constructor(appDom) {
		this.injectCanvas(appDom);
	}

	injectCanvas(appDom) {
		const canvas = document.createElement('canvas');
		appDom.appendChild(canvas);
		const canvasController = InstanceProvider.getCanvasController(canvas);
	}
}

export {App};