'use strict';

import Symbol from 'es6-symbol';
const context = Symbol();
const canvas = Symbol();

class CanvasController {
	constructor(_canvas) {
		this[canvas] = _canvas;
		this[context] = _canvas.getContext('2d');
	}

	drawLine(xPos, length, color) {
		console.log(color);
		this[context].beginPath();
		this[context].strokeStyle = color;
		this[context].moveTo(xPos, 0);
		this[context].lineTo(xPos, length);
		this[context].stroke();
	}

	startVerticalLine() {
		return setInterval(drawLineContinuous(this[context], document.body.clientWidth/2), 44);
	}

	drawExperiment(experiment) {
		let xPos = 5;
		const lines = experiment.lines;

		lines.forEach((line) => {
			this.drawLine(xPos, line.millis/20, line.color);
			xPos += 5;
		})
	}

	clearCanvas() {
		this[context].clearRect(0, 0, this[canvas].width, this[canvas].height);
	}
}

function drawLineContinuous(context, posX) {
	let posY = 0;
	const green = 150;
	context.strokeStyle = 'rgb(0, ' + green + ', 0)';

	return () => {
		context.beginPath();
		context.moveTo(posX, posY);
		context.lineTo(posX, posY+1);
		context.stroke();
		posY++;
	}
}

export {CanvasController};