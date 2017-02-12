'use strict';

import Symbol from 'es6-symbol';
import {Point} from './Point.es6';
const context = Symbol();
const canvas = Symbol();

const LINE_SPACING = 26;
const Y_TOP = 0;
const growthInterval = 44;
const X_CENTER = document.body.clientWidth/2;
const LINE_WIDTH = 8;
const WHITE = 'rgb(255, 255, 255)';
const diagonalAngle = 75;
const VERTICAL_SPACING = 2;
const X_START = X_CENTER - (LINE_SPACING/2) - (LINE_WIDTH/2);

class CanvasController {
	constructor(_canvas) {
		this[canvas] = _canvas;
		this[context] = _canvas.getContext('2d');
	}

	drawLine(startPoint, endPoint, lineColor) {
		this[context].strokeStyle = lineColor;
		this[context].lineCap = 'round';

		this[context].beginPath();
		this[context].moveTo(startPoint.x, startPoint.y);
		this[context].lineTo(endPoint.x, endPoint.y);
		this[context].stroke();
	}

	drawLineDiagonal(lineStart, angleInDegrees, length, color) {
		const radians = angleInDegrees * Math.PI / 180;
		const xOffset = length * Math.cos(radians);
		const yOffset = length * Math.sin(radians);

		const lineEnd = new Point(lineStart.x + xOffset, lineStart.y + yOffset);
		this.drawLine(lineStart, lineEnd, color);

		return lineEnd;
	}

	drawEstimate(estimate, lineNum) {
		let xPos;
		let remainingLength = estimate.millis/15;
		const numberOfLinesFromCenter = Math.round(lineNum/2);

		if (lineNum % 2) {
			// right side
			xPos = X_START - (numberOfLinesFromCenter * LINE_SPACING);
		} else {
			// left side
			xPos = X_START + (numberOfLinesFromCenter * LINE_SPACING);
		}

		const firstSegmentStart = new Point(xPos, 0);

		const firstSegmentEnd = this.drawVerticalSegment(firstSegmentStart, estimate, remainingLength, (50-numberOfLinesFromCenter*2));
		remainingLength -= firstSegmentStart.distanceTo(firstSegmentEnd);
		if(remainingLength <= 0) {
			return;
		}

		const secondSegmentEnd = this.drawSecondSegment(firstSegmentEnd, estimate, lineNum, remainingLength);
		remainingLength -= firstSegmentEnd.distanceTo(secondSegmentEnd);
		if(remainingLength <= 0) {
			return;
		}

		if(numberOfLinesFromCenter == 1) {
			const fourthSegmentEnd = this.drawFourthSegment(secondSegmentEnd, estimate, lineNum, remainingLength);
			remainingLength -= secondSegmentEnd.distanceTo(fourthSegmentEnd);
			if(remainingLength <= 0) {
				return;
			}
			const thirdSegmentEnd = this.drawVerticalSegment(fourthSegmentEnd, estimate, remainingLength, 430+(numberOfLinesFromCenter*(LINE_WIDTH+4)));
			remainingLength -= fourthSegmentEnd.distanceTo(thirdSegmentEnd);
			if(remainingLength <= 0) {
				return;
			}
			this.drawVerticalSegment(thirdSegmentEnd, estimate, remainingLength, (50-numberOfLinesFromCenter*2));
			return
		}

		const thirdSegmentEnd = this.drawVerticalSegment(secondSegmentEnd, estimate, remainingLength, 430+(numberOfLinesFromCenter*(LINE_WIDTH+4)));
		remainingLength -= secondSegmentEnd.distanceTo(thirdSegmentEnd);
		if(remainingLength <= 0) {
			return;
		}

		const fourthSegmentEnd = this.drawFourthSegment(thirdSegmentEnd, estimate, lineNum, remainingLength);
		remainingLength -= thirdSegmentEnd.distanceTo(fourthSegmentEnd);
		if(remainingLength <= 0) {
			return;
		}

		this.drawVerticalSegment(fourthSegmentEnd, estimate, lineNum, remainingLength);
	}

	drawVerticalSegment(segmentStart, estimate, remainingLength, segmentLength) {
		if(segmentLength > remainingLength) {
			segmentLength = remainingLength;
		}

		return this.drawLineDiagonal(segmentStart, 90, segmentLength, estimate.color)
	}

	drawSecondSegment(segmentStart, estimate, lineNum, remainingLength) {
		let angle;

		if (lineNum % 2) {
			angle = 90 + diagonalAngle;
		} else {
			angle = 90 - diagonalAngle;
		}

		return this.drawDiagonalSegment(segmentStart, estimate, lineNum, angle, remainingLength);
	}

	drawFourthSegment(segmentStart, estimate, lineNum, remainingLength) {
		let angle;

		if (lineNum % 2) {
			angle = 90 - diagonalAngle;
		} else {
			angle = 90 + diagonalAngle;
		}

		return this.drawDiagonalSegment(segmentStart, estimate, lineNum, angle, remainingLength);
	}

	drawDiagonalSegment(segmentStart, estimate, lineNum, angle, remainingLength) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);

		let segmentLength = 284 - (LINE_SPACING * numberOfLinesFromCenter) + ((LINE_WIDTH+VERTICAL_SPACING) * numberOfLinesFromCenter) + LINE_WIDTH * 2;
		if(segmentLength > remainingLength) {
			segmentLength = remainingLength;
		}
		return this.drawLineDiagonal(segmentStart, angle, segmentLength, estimate.color)
	}

	startVerticalLine(xPos) {
		return setInterval(drawLineContinuous(this[context], xPos), growthInterval);
	}

	drawExperiment(experiment) {
		const estimates = experiment.estimates;
		let lineNum = 1;

		estimates.forEach((estimate) => {
			if (lineNum < 35) {
				this.drawEstimate(estimate, lineNum);
			}

			lineNum++;
		})
	}

	clearCanvas() {
		this[context].clearRect(0, 0, this[canvas].width, this[canvas].height);
	}
}

function drawLineContinuous(context, posX) {
	let posY = Y_TOP;
	context.strokeStyle = WHITE;
	context.lineCap = 'round';
	context.lineWidth = LINE_WIDTH;

	return () => {
		context.beginPath();
		context.moveTo(posX, posY);
		context.lineTo(posX, posY+1);
		context.stroke();
		posY++;
	}
}

export {CanvasController};