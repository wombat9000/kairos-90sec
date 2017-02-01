const canvas = document.getElementById('canvas');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const cursor = canvas.getContext('2d');

cursor.beginPath();

const xCenter = (canvas.width/2);

cursor.moveTo(xCenter, 0);
cursor.lineTo(xCenter, canvas.height);
cursor.lineWidth = 15;
cursor.stroke();