const canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;



const xCenter = (canvas.width/2);

const startY = 0;

let destY = startY + 1;

let blue = 0;



let callback1 = () => {
	let cursor = canvas.getContext('2d');
	cursor.beginPath();

	cursor.moveTo(xCenter, startY);
	cursor.lineTo(xCenter, destY);
	cursor.lineWidth = 15;
	cursor.strokeStyle = 'rgb(0, 0, '+ blue + ')';
	cursor.stroke();
	destY++;
	blue += 2;

};

setInterval(callback1, 35);

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