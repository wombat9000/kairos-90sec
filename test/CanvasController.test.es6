'use strict';

import {CanvasController} from '../src/CanvasController.es6';
import {Point} from '../src/Point.es6';

describe('CanvasController', function () {

	let testee;
	let canvasMock;
	let contextMock;

	beforeEach(() => {
		contextMock = {
			beginPath: sinon.spy(),
			moveTo: sinon.spy(),
			lineTo: sinon.spy(),
			stroke: sinon.spy()
		};

		canvasMock = {
			getContext: sinon.stub().returns(contextMock)
		};

		testee = new CanvasController(canvasMock);
	});

	describe('- draw line', function () {
		const someStartPoint = new Point(11, 11);
		const someEndPoint = new Point(99, 99);
		const someColor = 'bla';


		it('should start line at given start point', function () {
	        const startPoint = new Point(0, 0);

	        testee.drawLine(startPoint, someEndPoint, someColor);

	        expect(contextMock.moveTo).to.have.been.calledWith(startPoint.x, startPoint.y);
	    });

		it('should end line at given end point', function () {
			const endPoint = new Point(10, 10);

	        testee.drawLine(someStartPoint, endPoint, someColor);

	        expect(contextMock.lineTo).to.have.been.calledWith(endPoint.x, endPoint.y);
	    });

		it('should set line color', function () {
			const lineColor = 'someColor';

	        testee.drawLine(someStartPoint, someEndPoint, lineColor);

	        expect(contextMock.strokeStyle).to.equal(lineColor);
	    });

		it('should draw the line', function () {
			testee.drawLine(someStartPoint, someEndPoint, someColor);

			expect(contextMock.beginPath).to.have.been.called;
			expect(contextMock.stroke).to.have.been.called;
		});
	});
});