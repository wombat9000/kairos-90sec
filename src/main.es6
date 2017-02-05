import {CanvasController} from '../src/CanvasController.es6';


const canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const canvasController = new CanvasController(canvas);


const xCenter = (canvas.width/2);

const startY = 0;

let destY = startY + 1;

let blue = 0;

canvasController.drawLine(xCenter, 20);

let red = 0;
let destY2 = startY + 1;

let callback2 = () => {
	let cursor = canvas.getContext('2d');
	cursor.beginPath();

	cursor.moveTo(xCenter+30, startY);
	cursor.lineTo(xCenter+30, destY2);
	cursor.lineWidth = 15;
	cursor.strokeStyle = 'rgb(0, ' + red + ', 0)';
	cursor.stroke();
	destY2++;
	red += 2;
};

setInterval(callback2, 44);