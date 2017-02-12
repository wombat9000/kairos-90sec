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

	findPointByAngle(lineStart, angleInDegrees, length) {
		const radians = angleInDegrees * Math.PI / 180;
		const xOffset = length * Math.cos(radians);
		const yOffset = length * Math.sin(radians);

		return new Point(lineStart.x + xOffset, lineStart.y + yOffset);
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

		const points = [];

		const firstSegmentStart = new Point(xPos, 0);

		points.push(firstSegmentStart);

		const firstSegmentEnd = this.drawVerticalSegment(firstSegmentStart, remainingLength, (50 - numberOfLinesFromCenter * 2));
		remainingLength -= firstSegmentStart.distanceTo(firstSegmentEnd);

		points.push(firstSegmentEnd);

		if(remainingLength <= 0) {
			return points;
		}

		const secondSegmentEnd = this.drawSecondSegment(firstSegmentEnd, estimate, lineNum, remainingLength);

		points.push(secondSegmentEnd);

		remainingLength -= firstSegmentEnd.distanceTo(secondSegmentEnd);
		if(remainingLength <= 0) {
			return points;
		}

		if(numberOfLinesFromCenter == 1) {
			const fourthSegmentEnd = this.drawFourthSegment(secondSegmentEnd, estimate, lineNum, remainingLength);
			remainingLength -= secondSegmentEnd.distanceTo(fourthSegmentEnd);
			points.push(fourthSegmentEnd);

			if(remainingLength <= 0) {
				return points;
			}
			const thirdSegmentEnd = this.drawVerticalSegment(fourthSegmentEnd, remainingLength, 430 + (numberOfLinesFromCenter * (LINE_WIDTH + 4)));
			remainingLength -= fourthSegmentEnd.distanceTo(thirdSegmentEnd);

			points.push(thirdSegmentEnd);

			if(remainingLength <= 0) {
				return points;
			}
			const fifthSegmentEnd = this.drawVerticalSegment(thirdSegmentEnd, remainingLength, (50 - numberOfLinesFromCenter * 2));
			points.push(fifthSegmentEnd);

			return points;
		}

		const thirdSegmentEnd = this.drawVerticalSegment(secondSegmentEnd, remainingLength, 430 + (numberOfLinesFromCenter * (LINE_WIDTH + 4)));
		remainingLength -= secondSegmentEnd.distanceTo(thirdSegmentEnd);
		points.push(thirdSegmentEnd);

		if(remainingLength <= 0) {
			return points;
		}

		const fourthSegmentEnd = this.drawFourthSegment(thirdSegmentEnd, estimate, lineNum, remainingLength);
		remainingLength -= thirdSegmentEnd.distanceTo(fourthSegmentEnd);
		points.push(fourthSegmentEnd);

		if(remainingLength <= 0) {
			return points;
		}

		const fifthSegmentEnd = this.drawVerticalSegment(fourthSegmentEnd, lineNum, remainingLength);
		points.push(fifthSegmentEnd);
		return points;
	}

	drawVerticalSegment(segmentStart, remainingLength, segmentLength) {
		if(segmentLength > remainingLength) {
			segmentLength = remainingLength;
		}

		return segmentStart.findPointByAngle(90, segmentLength)
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
		return this.findPointByAngle(segmentStart, angle, segmentLength)
	}

	startVerticalLine(xPos) {
		return setInterval(drawLineContinuous(this[context], xPos), growthInterval);
	}


	drawLineFromPoints(points, color) {
		for (let i = 0; i < (points.length-1); i++) {
			this.drawLine(points[i], points[i+1], color);
		}
	}

	drawExperiment(experiment) {
		let points;
		const estimates = experiment.estimates;
		let lineNum = 1;

		estimates.forEach((estimate) => {
			if (lineNum < 35) {
				points = this.drawEstimate(estimate, lineNum);

				this.drawLineFromPoints(points, estimate.color);
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