let socket = io();
var side = 10;
let myMatrix = [];

for (let i = 0; i < 50; i++) {
  myMatrix[i] = [];
  for (let j = 0; j < 50; j++) {
    myMatrix[i][j] = 0;
  }
}

function setup() {
  setTimeout(function () {
    createCanvas(myMatrix[0].length * side, myMatrix.length * side);
  });

  background("#acacac");
}

function draw(matrix) {
  if (!matrix) return; // Check if matrix is defined

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("black");
      } else if (matrix[y][x] == 4) {
        fill("#FBCB7B");
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
      }

      rect(x * side, y * side, side, side);
    }
  }
}

socket.on("initial", function (data) {
  myMatrix = data;
  draw(myMatrix);
});

socket.on("send matrix", function (data) {
  myMatrix = data;
  draw(myMatrix);
});
