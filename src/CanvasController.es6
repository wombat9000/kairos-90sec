'use strict';

import Symbol from 'es6-symbol';
const context = Symbol();
const canvas = Symbol();

class CanvasController {
	constructor(_canvas) {
		this[canvas] = _canvas;
		this[context] = _canvas.getContext('2d');
	}

	drawLine(xPos, length) {
		this[context].beginPath();
		this[context].moveTo(xPos, 0);
		this[context].lineTo(xPos, length);
		this[context].lineWidth = 15;
		this[context].stroke();
	}

	startVerticalLine() {
		return setInterval(drawLineContinuous(this[context], document.body.clientWidth/2), 44);
	}

	clearCanvas() {
		this[context].clearRect(0, 0, this[canvas].width, this[canvas].height);
	}
}

function drawLineContinuous(context, posX) {
	let posY = 0;
	const red = 150;
	context.strokeStyle = 'rgb(0, ' + red + ', 0)';

	return () => {
		context.beginPath();
		context.moveTo(posX, posY);
		context.lineTo(posX, posY+1);
		context.stroke();
		posY++;
	}
}

export {CanvasController};