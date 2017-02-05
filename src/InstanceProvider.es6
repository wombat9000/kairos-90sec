'use strict';

import {CanvasController} from './CanvasController.es6';

class InstanceProvider {

	static getCanvasController(appDom) {
		return new CanvasController(appDom);
	}
}

export {InstanceProvider};