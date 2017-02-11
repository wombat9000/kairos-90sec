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

		this[context].beginPath();
		this[context].moveTo(startPoint.x, startPoint.y);
		this[context].lineTo(endPoint.x, endPoint.y);
		this[context].stroke();
	}

	drawLineDiagonal(lineStart, angle, length, color) {
		const radians = angle * Math.PI / 180;
		const xOffset = length * Math.cos(radians);
		const yOffset = length * Math.sin(radians);

		const lineEnd = new Point(lineStart.x + xOffset, lineStart.y + yOffset);
		this.drawLine(lineStart, lineEnd, color);

		return lineEnd;
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

		if(lineNum < 3) {
			const fourthSegmentEnd = this.drawFourthSegment(secondSegmentEnd, estimate, lineNum);
			const thirdSegmentEnd = this.drawThirdSegment(fourthSegmentEnd, estimate, lineNum);
			this.drawFifthSegment(thirdSegmentEnd, estimate, lineNum);
			return
		}

		// draw third segment
			// straight down
			// gets longer by some factor
		const thirdSegmentEnd = this.drawThirdSegment(secondSegmentEnd, estimate, lineNum);


		// draw fourth segment
			// diagonal, counterpiece to second segment
		const fourthSegmentEnd = this.drawFourthSegment(thirdSegmentEnd, estimate, lineNum);


		// draw fifth segment
			// same as first
		this.drawFifthSegment(fourthSegmentEnd, estimate, lineNum);
	}

	drawFirstSegment(segmentStart, estimate, lineNum) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);

		const segmentEnd = new Point(segmentStart.x, segmentStart.y+50-numberOfLinesFromCenter*2);
		this.drawLine(segmentStart, segmentEnd, estimate.color);
		return segmentEnd;
	}

	drawFifthSegment(segmentStart, estimate, lineNum) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);

		let segmentStartCorrected;
		if (lineNum % 2) {
			if(lineNum != 1){
				segmentStartCorrected = new Point(segmentStart.x-1, segmentStart.y-3);
			} else {
				segmentStartCorrected = new Point(segmentStart.x, segmentStart.y-5);
			}
		} else {
			if(lineNum != 2){
				segmentStartCorrected = new Point(segmentStart.x+1, segmentStart.y-3);
			} else {
				segmentStartCorrected = new Point(segmentStart.x, segmentStart.y-5);
			}
		}

		const segmentEnd = new Point(segmentStartCorrected.x, segmentStartCorrected.y+50-numberOfLinesFromCenter*2);
		this.drawLine(segmentStartCorrected, segmentEnd, estimate.color);
	}

	drawSecondSegment(segmentStart, estimate, lineNum) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);
		let angle, segmentStartCorrected;

		let length = 284;

		if (lineNum > 2) {
			length = length - (resultsLineSpacing * numberOfLinesFromCenter) + ((lineWidth+verticalSpacing) * numberOfLinesFromCenter) + lineWidth * 3;
		} else {
			length += 8;
		}

		if (lineNum % 2) {
			angle = 90 + diagonalAngle;
			segmentStartCorrected = new Point(segmentStart.x+1, segmentStart.y-3);

		} else {
			angle = 90 - diagonalAngle;
			segmentStartCorrected = new Point(segmentStart.x-1, segmentStart.y-3);
		}

		return this.drawLineDiagonal(segmentStartCorrected, angle, length, estimate.color);
	}

	drawFourthSegment(segmentStart, estimate, lineNum) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);
		let angle, segmentStartCorrected;

		let length = 284;

		if (lineNum > 2) {
			length = length - (resultsLineSpacing * numberOfLinesFromCenter) + ((lineWidth+verticalSpacing) * numberOfLinesFromCenter) + lineWidth * 3;
		}

		if (lineNum % 2) {
			angle = 90 - diagonalAngle;
			segmentStartCorrected = new Point(segmentStart.x-1, segmentStart.y-3);
			if (lineNum === 1) {
				segmentStartCorrected = new Point(segmentStart.x-3, segmentStart.y-1);
				length += 10;
			}
		} else {
			angle = 90 + diagonalAngle;
			segmentStartCorrected = new Point(segmentStart.x+1, segmentStart.y-3);
			if (lineNum === 2) {
				segmentStartCorrected = new Point(segmentStart.x+3, segmentStart.y-1);
				length += 10;
			}
		}

		return this.drawLineDiagonal(segmentStartCorrected, angle, length, estimate.color);
	}

	drawThirdSegment(segmentStart, estimate, lineNum) {
		const numberOfLinesFromCenter = Math.round(lineNum/2);
		let segmentStartCorrected;

		if (lineNum % 2) {
			segmentStartCorrected = new Point(segmentStart.x+1, segmentStart.y-3);
		} else {
			segmentStartCorrected = new Point(segmentStart.x-1, segmentStart.y-3);
		}

		const segmentEnd = new Point(segmentStartCorrected.x, segmentStartCorrected.y+430+(numberOfLinesFromCenter*(lineWidth+4)));
		this.drawLine(segmentStartCorrected, segmentEnd, estimate.color);
		return segmentEnd;
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