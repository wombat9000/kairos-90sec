'use strict';

import {Bootstrapper} from '../src/Bootstrapper.es6';
import * as canvasController from '../src/CanvasController.es6';

describe('Bootstrapper', function () {

	let appDomMock;
	let createElementStub;
	let sandbox;
	let someCanvas;
	let canvasControllerMock;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		appDomMock = {
			appendChild: sinon.spy()
		};

		someCanvas = {
			getContext: sinon.stub()
		};

		canvasControllerMock = sinon.createStubInstance(canvasController.CanvasController);

		sandbox.stub(canvasController, 'CanvasController').returns(canvasControllerMock);

		createElementStub = sandbox.stub(document, 'createElement').returns(someCanvas);

		new Bootstrapper(appDomMock);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('- initialisation', () => {
		it('creates a canvas element', function () {
			expect(createElementStub).to.have.been.calledWith('canvas');
		});

		it('should append canvas to dom', function () {
			expect(appDomMock.appendChild).to.have.been.calledWith(someCanvas);
		});

		it('should set canvas width and height to client width and height', function () {
			expect(someCanvas.width).to.equal(document.body.clientWidth);
			expect(someCanvas.height).to.equal(document.body.clientHeight);
		})
	});
});