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
const diagonalAngle = 75;
const verticalSpacing = 2;

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

	drawEstimate(firstSegmentStart, estimate, lineNum) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);

		let remainingLength = estimate.millis/15;

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

		if(lineNum <= 2) {
			const fourthSegmentEnd = this.drawFourthSegment(secondSegmentEnd, estimate, lineNum, remainingLength);
			remainingLength -= secondSegmentEnd.distanceTo(fourthSegmentEnd);
			if(remainingLength <= 0) {
				return;
			}
			const thirdSegmentEnd = this.drawVerticalSegment(fourthSegmentEnd, estimate, remainingLength, 430+(numberOfLinesFromCenter*(lineWidth+4)));
			remainingLength -= fourthSegmentEnd.distanceTo(thirdSegmentEnd);
			if(remainingLength <= 0) {
				return;
			}
			this.drawVerticalSegment(thirdSegmentEnd, estimate, remainingLength, (50-numberOfLinesFromCenter*2));
			return
		}

		const thirdSegmentEnd = this.drawVerticalSegment(secondSegmentEnd, estimate, remainingLength, 430+(numberOfLinesFromCenter*(lineWidth+4)));
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

		let segmentLength = 284 - (resultsLineSpacing * numberOfLinesFromCenter) + ((lineWidth+verticalSpacing) * numberOfLinesFromCenter) + lineWidth * 2;
		if(segmentLength > remainingLength) {
			segmentLength = remainingLength;
		}
		return this.drawLineDiagonal(segmentStart, angle, segmentLength, estimate.color)
	}

	startVerticalLine(xPos) {
		return setInterval(drawLineContinuous(this[context], xPos), growthInterval);
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
	context.lineCap = 'round';
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