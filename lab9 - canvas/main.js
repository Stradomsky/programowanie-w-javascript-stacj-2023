const ballCountInput = document.querySelector("#ballsNumber");
let countOfBalls;
const beginButton = document.getElementById("startBtn");
const clearButton = document.getElementById("clearBtn");

const drawingCanvas = document.createElement("canvas");
drawingCanvas.classList.add("canvas");
document.body.appendChild(drawingCanvas);
const canvasContext = drawingCanvas.getContext("2d");

function adjustCanvasSize() {
  drawingCanvas.width = window.innerWidth;
  drawingCanvas.height = window.innerHeight * 0.92;
}
adjustCanvasSize();
window.addEventListener('resize', adjustCanvasSize);

beginButton.addEventListener("click", initiateAnimation);
clearButton.addEventListener("click", clearCanvas);

let arrayOfBalls = [];

function initiateAnimation() {
  countOfBalls = Number(ballCountInput.value);
  if (arrayOfBalls.length === 0) {
    for (let i = 0; i < countOfBalls; i++) {
      let size = getRandomNumber(10, 20);
      arrayOfBalls.push(new Ball(getRandomNumber(size, drawingCanvas.width - size), getRandomNumber(size, drawingCanvas.height - size), size));
    }
  }
  requestAnimationFrame(drawAnimation);
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  arrayOfBalls = [];
}

function drawAnimation() {
  canvasContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  arrayOfBalls.forEach((Ball, index) => {
    arrayOfBalls.forEach((otherBall, otherIndex) => {
      if (index !== otherIndex && checkDistance(Ball, otherBall) < getThresholdValue()) {
        drawLine(Ball, otherBall);
      }
    });
    Ball.moveAndDraw();
  });
  requestAnimationFrame(drawAnimation);
}

function Ball(x, y, radius) {
  this.xPos = x;
  this.yPos = y;
  this.radiusSize = radius;
  this.xSpeed = getRandomFloat(-1.5, 1.5);
  this.ySpeed = getRandomFloat(-1.5, 1.5);
  this.color = generateColor();

  this.moveAndDraw = function() {
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    if (this.xPos + this.radiusSize > drawingCanvas.width || this.xPos - this.radiusSize < 0) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.yPos + this.radiusSize > drawingCanvas.height || this.yPos - this.radiusSize < 0) {
      this.ySpeed = -this.ySpeed;
    }
    canvasContext.fillStyle = this.color;
    canvasContext.beginPath();
    canvasContext.arc(this.xPos, this.yPos, this.radiusSize, 0, Math.PI * 2, true);
    canvasContext.fill();
  };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function generateColor() {
  const red = getRandomNumber(0, 255);
  const green = getRandomNumber(0, 255);
  const blue = getRandomNumber(0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

function getThresholdValue() {
  return Number(document.getElementById("dist").value);
}

function checkDistance(Ball1, Ball2) {
  const xDistance = Ball1.xPos - Ball2.xPos;
  const yDistance = Ball1.yPos - Ball2.yPos;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

function drawLine(Ball1, Ball2) {
  canvasContext.beginPath();
  canvasContext.strokeStyle = "#000";
  canvasContext.moveTo(Ball1.xPos, Ball1.yPos);
  canvasContext.lineTo(Ball2.xPos, Ball2.yPos);
  canvasContext.stroke();
}