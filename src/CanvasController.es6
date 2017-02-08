'use strict';

import Symbol from 'es6-symbol';
const context = Symbol();
const canvas = Symbol();

const resultsLineSpacing = 5;
const top = 0;
const growthInterval = 44;
const centerOfScreen = document.body.clientWidth/2;
const lineColor = 'rgb(0, 150, 0)';

class CanvasController {
	constructor(_canvas) {
		this[canvas] = _canvas;
		this[context] = _canvas.getContext('2d');
	}

	drawLine(xPos, length, color) {
		this[context].beginPath();
		this[context].strokeStyle = color;
		this[context].moveTo(xPos, top);
		this[context].lineTo(xPos, length);
		this[context].stroke();
	}

	startVerticalLine() {
		return setInterval(drawLineContinuous(this[context], centerOfScreen), growthInterval);
	}

	drawExperiment(experiment) {
		let xPos = 5;
		const lines = experiment.lines;

		lines.forEach((line) => {
			this.drawLine(xPos, line.millis/20, line.color);
			xPos += resultsLineSpacing;
		})
	}

	clearCanvas() {
		this[context].clearRect(0, 0, this[canvas].width, this[canvas].height);
	}
}

function drawLineContinuous(context, posX) {
	let posY = top;
	context.strokeStyle = lineColor;

	return () => {
		context.beginPath();
		context.moveTo(posX, posY);
		context.lineTo(posX, posY+1);
		context.stroke();
		posY++;
	}
}

export {CanvasController};