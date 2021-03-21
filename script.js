const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const birdImg = document.createElement("img");
birdImg.src =
  "https://b.kisscc0.com/20190410/ffw/kisscc0-flappy-bird-tap-2d-computer-graphics-jump-bird-jum-flying-bird-9-frame-1-5cadb87ce10009.2147683715548888289216.png";
const backgroundImg = document.createElement("img");
backgroundImg.src =
  "https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png";

let xDelta = 1;

let min = 50;
let max = 200;

function randomLines() {
  return Math.floor(Math.random() * (max - min) + min);
}

function Square(x, y, width, heigth, isTop) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.heigth = heigth;
  this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if (!isTop) {
    this.y = canvas.height - heigth;
  }
}

let bird = {
  x: 64,
  y: canvas.height / 2,
  width: 60,
  heigth: 60,
  gravity: 0.1,
  velocity: 0,
  lift: -15,
};

function birdMoving() {
  bird.velocity += bird.gravity;
  bird.velocity += 0.5;
  bird.y += bird.velocity;

  if (bird.y > canvas.height) {
    bird.y = canvas.height;
    bird.velocity = 0;
  }

  if (bird.y < 0) {
    bird.y = 0;
    bird.velocity = 0;
  }
}

function birdUp() {
  bird.velocity += bird.lift;
}

function setup() {
  let x = 20;
  for (let i = 0; i < 7; i++) {
    x += Math.random() * 100 + 50;
    let tmpSquare = new Square(x, 0, 20, randomLines(), true);
    squares.push(tmpSquare);
  }
  x = 0;
  for (let i = 0; i < 7; i++) {
    x += Math.random() * 100 + 50;
    let tmpSquare = new Square(x, 0, 20, randomLines(), false);
    squares.push(tmpSquare);
  }
}

function update() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].x -= xDelta;
    if (squares[i].x + squares[i].width <= 0) {
      squares[i].x = canvas.width;
    }
  }

  (bird.x += 0), 00005;
  birdMoving();
}

function draw() {
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  squares.forEach(function (val) {
    context.fillStyle = val.color;
    context.fillRect(val.x, val.y, val.width, val.heigth);
  });

  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.heigth);
}

let squares = [];

function loop() {
  requestAnimationFrame(loop);

  update();

  endGame();

  draw();
}

setup();
loop();

document.addEventListener("keydown", function (evt) {
  if (evt.code === "Space") {
    birdUp();
  }
});

function endGame() {
  for (let i = 0; i < squares.length; i++) {
    if (bird.x + bird.width >= squares[i].x && bird.x <= squares[i].x + 20) {
      if (canvas.height - (bird.y + bird.heigth) <= squares[i].heigth) {
        console.log("find up", squares[i]);
      }
      if (bird.y + bird.heigth <= squares[i].heigth) {
        console.log("find down", squares[i]);
      }
    }
  }
}
