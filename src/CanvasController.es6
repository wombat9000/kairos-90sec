'use strict';

import Symbol from 'es6-symbol';
import {Point} from './Point.es6';
const context = Symbol();
const canvas = Symbol();

const resultsLineSpacing = 26;
const top = 0;
const growthInterval = 44;
const centerOfScreen = document.body.clientWidth/2;
const lineWidth = 8;
const white = 'rgb(255, 255, 255)';

class CanvasController {
	constructor(_canvas) {
		this[canvas] = _canvas;
		this[context] = _canvas.getContext('2d');
	}

	drawLine(startPoint, endPoint, lineColor) {
		this[context].strokeStyle = lineColor;

		this[context].beginPath();
		this[context].moveTo(startPoint.x, startPoint.y);
		this[context].lineTo(endPoint.x, endPoint.y);
		this[context].stroke();
	}

	drawEstimate(lineStart, estimate, lineNum) {
		// draw first segment
			// straight down
			// gets shorter by some factor
		const firstSegmentEnd = this.drawFirstSegment(lineStart, estimate, lineNum);

		// draw second segment
			// diagonal, always same angle
			// gets shorter by some factor
		const secondSegmentEnd = this.drawSecondSegment(firstSegmentEnd, estimate, lineNum);

		// draw third segment
			// straight down
			// gets longer by some factor
		const thirdSegmentEnd = this.drawThirdSegment(secondSegmentEnd, estimate, lineNum);


		// draw fourth segment
			// diagonal, counterpiece to second segment
		const fourthSegmentEnd = this.drawFourthSegment(thirdSegmentEnd, estimate, lineNum);


		// draw fifth segment
			// same as first
		const fifthSegmentEnd = this.drawFifthSegment(fourthSegmentEnd, estimate, lineNum);
	}

	drawFirstSegment(segmentStart, estimate, lineNum) {
		const segmentEnd = new Point(segmentStart.x, segmentStart.y+50-lineNum);
		this.drawLine(segmentStart, segmentEnd, estimate.color);
		return segmentEnd;
	}

	drawSecondSegment(segmentStart, estimate, lineNum) {
		let angle;
		if (lineNum % 2) {
			angle = 90 + 65;
		} else {
			angle = 90 - 65;
		}

		return this.drawLineDiagonal(segmentStart, angle, 100, estimate.color);
	}

	drawThirdSegment(segmentStart, estimate, lineNum) {
		const linesFromCenter = Math.round(lineNum/2);

		const segmentEnd = new Point(segmentStart.x, segmentStart.y+150+(linesFromCenter*2));
		this.drawLine(segmentStart, segmentEnd, estimate.color);
		return segmentEnd;
	}

	drawFourthSegment(segmentStart, estimate, lineNum) {
		let angle;
		if (lineNum % 2) {
			angle = 90 - 65;

		} else {
			angle = 90 + 65;
		}

		const segmentEnd = this.drawLineDiagonal(segmentStart, angle, 100, estimate.color);
		this.drawLine(segmentStart, segmentEnd, estimate.color);
		return segmentEnd;
	}

	drawFifthSegment(segmentStart, estimate, lineNum) {
		const linesFromCenter = Math.round(lineNum/2);

		const segmentEnd = new Point(segmentStart.x, segmentStart.y+50-linesFromCenter);
		this.drawLine(segmentStart, segmentEnd, estimate.color);
		return segmentEnd;
	}


	drawLineDiagonal(lineStart, angle, length, color) {

		const radians = angle * Math.PI / 180;

		const xOffset = length * Math.cos(radians);
		const yOffset = length * Math.sin(radians);

		const lineEnd = new Point(lineStart.x + xOffset, lineStart.y + yOffset);

		this.drawLine(lineStart, lineEnd, color);

		return lineEnd;
	}


	startVerticalLine() {
		return setInterval(drawLineContinuous(this[context], centerOfScreen), growthInterval);
	}

	drawExperiment(experiment) {
		let lineStart, lineEnd;
		const estimates = experiment.estimates;

		let lineNum = 1;

		const xStart = centerOfScreen - (resultsLineSpacing/2) - (lineWidth/2);
		let xPos = xStart;

		estimates.forEach((estimate) => {
			let maxLength = estimate.millis/20;
			lineStart = new Point(xPos, 0);
			lineEnd = new Point(xPos, maxLength);
			if (lineNum < 35) {
				// this.drawLine(lineStart, lineEnd, estimate.color);
				this.drawEstimate(lineStart, estimate, lineNum);
			}

			if (lineNum % 2) {
				// right side
				xPos = xStart + (Math.round(lineNum/2) * resultsLineSpacing);
			} else {
				// left side
				xPos = xStart - (Math.round(lineNum/2) * resultsLineSpacing);
			}

			lineNum++;
		})
	}



	clearCanvas() {
		this[context].clearRect(0, 0, this[canvas].width, this[canvas].height);
	}
}

function drawLineContinuous(context, posX) {
	let posY = top;
	context.strokeStyle = white;
	context.lineWidth = lineWidth;

	return () => {
		context.beginPath();
		context.moveTo(posX, posY);
		context.lineTo(posX, posY+1);
		context.stroke();
		posY++;
	}
}

export {CanvasController};