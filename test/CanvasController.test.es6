'use strict';

import {CanvasController} from '../src/CanvasController.es6';

describe('CanvasController', function () {

	const originY = 0;
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

	describe('- draw a line', function () {
		it('starts the line at given posX', function () {
			const posX = 10;
			const someLength = 5;

			testee.drawFullVerticalLine(posX, someLength);

			expect(contextMock.moveTo).to.have.been.calledWith(posX, originY);
		});

		it('draws line with given length', function () {
			const posX = 10;
			const someLength = 5;

			testee.drawFullVerticalLine(posX, someLength);

			expect(contextMock.lineTo).to.have.been.calledWith(posX, (originY+someLength));
		});
	});
});