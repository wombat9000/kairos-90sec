'use strict';

import Symbol from 'es6-symbol';
const context = Symbol();

export class CanvasController {
	constructor(canvas) {
		this[context] = canvas.getContext('2d');
	}

	drawLine(xPos, length) {
		this[context].beginPath();
		this[context].moveTo(xPos, 0);
		this[context].lineTo(xPos, length);
		this[context].lineWidth = 15;
		this[context].stroke();
	}

	quack() {
		console.log("moo");
	}
}

// export {CanvasController};