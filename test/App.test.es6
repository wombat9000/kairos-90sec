'use strict';

import {App} from '../src/App.es6';

describe('App', function () {

	let appDomMock;
	let createElementStub;
	let sandbox;
	let someCanvas;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		appDomMock = {
			appendChild: sinon.spy()
		};

		someCanvas = {

		};

		createElementStub = sandbox.stub(document, 'createElement').returns(someCanvas);

		new App(appDomMock);
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
	});
});