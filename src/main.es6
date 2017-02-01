const canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const cursor = canvas.getContext('2d');

cursor.beginPath();

const xCenter = (canvas.width/2);

const startY = 0;
cursor.moveTo(xCenter, startY);

let destY = startY + 1;


let callback = () => {
	cursor.lineTo(xCenter, destY);
	cursor.lineWidth = 15;
	cursor.stroke();
	destY++;

	// ctx.strokeStyle = "black";
	// ctx.moveTo(point.startX, point.startY);
	// ctx.lineTo(point.startX1, point.startY1);
	// ctx.stroke();
};

setInterval(callback, 200);