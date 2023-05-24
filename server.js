var express = require("express");
var app = express();
app.use(express.static("."));
app.get("/", function (req, res) {
  res.redirect("index.html");
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(3000, function(){
  console.log("Is running on port 3000")
});



const Grass = require("./Grass");
const Mard = require("./Mard");
const GrassEater = require("./GrassEater");
const Kendani = require("./Kendani");

genMatrix = (n, m) => {
  var matrix = [];
  for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
      var r = Math.floor(Math.random() * 100);
      if (r < 20) r = 0;
      else if (r < 40) r = 1;
      else if (r < 55) r = 2;
      else if (r < 75) r = 3;
      else if (r < 85) r = 4;
      matrix[y][x] = r;
    }
  }
  return matrix;
};

matrix = [];
grassArr = [];
grassEaterArr = [];
kendaniArr = [];
mardArr = [];

function createObjects() {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        const gr = new Grass(j, i, 1);
        grassArr.push(gr);
      } else if (matrix[i][j] === 2) {
        const great = new GrassEater(j, i, 2);
        grassEaterArr.push(great);
      } else if (matrix[i][j] === 3) {
        const knd = new Kendani(j, i, 3);
        kendaniArr.push(knd);
      } else if (matrix[i][j] === 4) {
        const mrd = new Mard(j, i, 4);
        mardArr.push(mrd);
      }
    }
  }
}

matrix = genMatrix(50, 50);
createObjects();

function drawGame() {
  for (let i = 0; i < grassArr.length; i++) {
    grassArr[i].mul();
  }
  for (let i = 0; i < grassEaterArr.length; i++) {
    grassEaterArr[i].eat();
    grassEaterArr[i].move();
    grassEaterArr[i].mul();
    grassEaterArr[i].die();
  }
  for (let i = 0; i < kendaniArr.length; i++) {
    kendaniArr[i].eat();
    kendaniArr[i].move();
    kendaniArr[i].mul();
    kendaniArr[i].die();
  }
  for (let i = 0; i < mardArr.length; i++) {
    mardArr[i].eat();
    mardArr[i].move();
    mardArr[i].mul();
    mardArr[i].die();
  }
  
  io.sockets.emit("send matrix", matrix);

  
}

setInterval(function () {
  drawGame();
}, 1000);

io.on("connection", function (socket) {
  socket.emit("initial", matrix);
});
