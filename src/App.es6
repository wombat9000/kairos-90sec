'use strict';

import {CanvasController} from '../src/CanvasController.es6';

import Symbol from 'es6-symbol';

class App {
	constructor(appDom) {
		const canvas = document.createElement('canvas');
		appDom.appendChild(canvas);
	}
}

export {App};