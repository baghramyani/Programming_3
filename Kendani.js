const LivingCreature = require("./LivingCreature");

module.exports = class Kendani extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 10;
    this.multiply = 0;
  }

  move() {
    var newCell = this.random(this.chooseCell(0));
    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[this.y][this.x] = 0;
      matrix[newY][newX] = this.index;
      this.x = newX;
      this.y = newY;
      this.energy -= 3;
    }
  }

  mul() {
    var newCell = this.random(this.chooseCell(0));
    if (this.energy >= 15 && newCell) {
      var newKendani = new Kendani(newCell[0], newCell[1], this.index);
      kendaniArr.push(newKendani);
      matrix[newCell[1]][newCell[0]] = this.index;
      this.energy = 0;
    }
  }

  eat() {
    var grassEater = this.random(this.chooseCell(2));
    if (grassEater) {
      var newX = grassEater[0];
      var newY = grassEater[1];
      matrix[newY][newX] = this.index;
      matrix[this.y][this.x] = 0;
      for (var i = 0; i < grassEaterArr.length; i++) {
        if (newX === grassEaterArr[i].x && newY === grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
      this.energy += 2;
    }
  }

  die() {
    if (this.energy <= 5) {
      matrix[this.y][this.x] = 0;
      for (var i = 0; i < kendaniArr.length; i++) {
        if (kendaniArr[i].x === this.x && kendaniArr[i].y === this.y) {
          kendaniArr.splice(i, 1);
          break;
        }
      }
    }
  }
};
