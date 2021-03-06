'use strict';

import Symbol from 'es6-symbol';
import {Point} from './Point.es6';
const context = Symbol();
const canvas = Symbol();

const LINE_SPACING = 26;
const growthInterval = 40;
const LINE_WIDTH = 8;
const WHITE = 'rgb(255, 255, 255)';
const diagonalAngle = 75;
const VERTICAL_SPACING = 2;

class CanvasController {
	constructor(_canvas) {
		this[canvas] = _canvas;
		this[context] = _canvas.getContext('2d');
	}

	drawLine(startPoint, endPoint, lineColor) {
		this[context].strokeStyle = lineColor;
		this[context].lineCap = 'round';
		this[context].lineWidth = LINE_WIDTH;
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

	calculatePointsForLineLinear(lineNum, maxLength) {
		const X_CENTER = document.body.clientWidth/2;
		const X_START = X_CENTER - LINE_SPACING/2 - LINE_WIDTH/2 - (LINE_SPACING * 17);

		let xPos = X_START + lineNum * LINE_SPACING;


		const points = [];

		const firstSegmentStart = new Point(xPos, 0);

		points.push(firstSegmentStart);

		const secondPoint = new Point(xPos, maxLength);

		points.push(secondPoint);

		return points;
	}

	calculatePointsForLine(lineNum, maximumLength) {
		let xPos;
		const numberOfLinesFromCenter = Math.round(lineNum/2);

		const X_CENTER = document.body.clientWidth/2;
		const X_START = X_CENTER - (LINE_SPACING/2) - (LINE_WIDTH/2);

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

		const firstSegmentEnd = this.drawVerticalSegment(firstSegmentStart, maximumLength, (50 - numberOfLinesFromCenter * 2));
		maximumLength -= firstSegmentStart.distanceTo(firstSegmentEnd);

		points.push(firstSegmentEnd);

		if(maximumLength <= 0) {
			return points;
		}

		const secondSegmentEnd = this.drawSecondSegment(firstSegmentEnd, lineNum, maximumLength);

		points.push(secondSegmentEnd);

		maximumLength -= firstSegmentEnd.distanceTo(secondSegmentEnd);
		if(maximumLength <= 0) {
			return points;
		}

		if(numberOfLinesFromCenter == 1) {
			const fourthSegmentEnd = this.drawFourthSegment(secondSegmentEnd, lineNum, maximumLength);
			maximumLength -= secondSegmentEnd.distanceTo(fourthSegmentEnd);
			points.push(fourthSegmentEnd);

			if(maximumLength <= 0) {
				return points;
			}
			const thirdSegmentEnd = this.drawVerticalSegment(fourthSegmentEnd, maximumLength, 430 + (numberOfLinesFromCenter * (LINE_WIDTH + 4)));
			maximumLength -= fourthSegmentEnd.distanceTo(thirdSegmentEnd);

			points.push(thirdSegmentEnd);

			if(maximumLength <= 0) {
				return points;
			}
			const fifthSegmentEnd = this.drawVerticalSegment(thirdSegmentEnd, maximumLength, (50 - numberOfLinesFromCenter * 2));
			points.push(fifthSegmentEnd);

			return points;
		}

		const thirdSegmentEnd = this.drawVerticalSegment(secondSegmentEnd, maximumLength, 430 + (numberOfLinesFromCenter * (LINE_WIDTH + 4)));
		maximumLength -= secondSegmentEnd.distanceTo(thirdSegmentEnd);
		points.push(thirdSegmentEnd);

		if(maximumLength <= 0) {
			return points;
		}

		const fourthSegmentEnd = this.drawFourthSegment(thirdSegmentEnd, lineNum, maximumLength);
		maximumLength -= thirdSegmentEnd.distanceTo(fourthSegmentEnd);
		points.push(fourthSegmentEnd);

		if(maximumLength <= 0) {
			return points;
		}

		const fifthSegmentEnd = this.drawVerticalSegment(fourthSegmentEnd, lineNum, maximumLength);
		points.push(fifthSegmentEnd);
		return points;
	}

	drawVerticalSegment(segmentStart, remainingLength, segmentLength) {
		if(segmentLength > remainingLength) {
			segmentLength = remainingLength;
		}

		return segmentStart.findPointByAngle(90, segmentLength)
	}

	drawSecondSegment(segmentStart, lineNum, remainingLength) {
		let angle;

		if (lineNum % 2) {
			angle = 90 + diagonalAngle;
		} else {
			angle = 90 - diagonalAngle;
		}

		return this.drawDiagonalSegment(segmentStart, lineNum, angle, remainingLength);
	}

	drawFourthSegment(segmentStart, lineNum, remainingLength) {
		let angle;

		if (lineNum % 2) {
			angle = 90 - diagonalAngle;
		} else {
			angle = 90 + diagonalAngle;
		}

		return this.drawDiagonalSegment(segmentStart, lineNum, angle, remainingLength);
	}

	drawDiagonalSegment(segmentStart, lineNum, angle, remainingLength) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);

		let segmentLength = 284 - (LINE_SPACING * numberOfLinesFromCenter) + ((LINE_WIDTH+VERTICAL_SPACING) * numberOfLinesFromCenter) + LINE_WIDTH * 2;
		if(segmentLength > remainingLength) {
			segmentLength = remainingLength;
		}
		return this.findPointByAngle(segmentStart, angle, segmentLength)
	}

	startEstimateDrawing(lineNum) {
		return setInterval(this.drawLineContinuous(lineNum), growthInterval);
	}

	startEstimateDrawingLinear(lineNum) {
		return setInterval(this.drawLineContinuousLinear(lineNum), Math.round(growthInterval*1.5));
	}

	drawLineContinuous(lineNum) {
		let length = 1;

		return () => {
			this.clearCanvas();
			let points = this.calculatePointsForLine(lineNum, length);
			this.drawLineFromPoints(points, WHITE);
			length++;
		}
	}

	drawLineContinuousLinear(lineNum) {
		let length = 1;

		return () => {
			this.clearCanvas();
			let points = this.calculatePointsForLineLinear(lineNum, length);
			this.drawLineFromPoints(points, WHITE);
			length++;
		}
	}

	drawLineFromPoints(points, color) {
		for (let i = 0; i < (points.length-1); i++) {
			this.drawLine(points[i], points[i+1], color);
		}
	}

	drawExperimentCubic(experiment) {
		let points;
		const estimates = experiment.estimates;
		let lineNum = 1;

		estimates.forEach((estimate) => {
			if (lineNum < 35) {
				let maxLength = estimate.millis/20;
				points = this.calculatePointsForLine(lineNum, maxLength);

				this.drawLineFromPoints(points, estimate.color);
			}

			lineNum++;
		})
	}

	drawExperimentLinear(experiment) {
		let lineStart, lineEnd;
		const estimates = experiment.estimates;
		let numLines = 1;

		const X_CENTER = document.body.clientWidth/2;
		const X_START = X_CENTER - LINE_SPACING/2 - LINE_WIDTH/2 - (LINE_SPACING * 17);

		estimates.forEach((estimate) => {
			let xPos = X_START + numLines * LINE_SPACING;
			console.log(xPos);

			let maxLength = estimate.millis/25;
			lineStart = new Point(xPos, 0);
			lineEnd = new Point(xPos, maxLength);
			if (numLines < 35) {
				this.drawLine(lineStart, lineEnd, estimate.color);
			}

			numLines++;
		})
	}

	clearCanvas() {
		this[context].clearRect(0, 0, this[canvas].width, this[canvas].height);
	}
}

export {CanvasController};