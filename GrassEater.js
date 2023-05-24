const LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 10;
  }

  move() {
    const newCell = this.random(this.chooseCell(0));
    if (newCell) {
      const newX = newCell[0];
      const newY = newCell[1];
      matrix[this.y][this.x] = 0;
      matrix[newY][newX] = this.index;
      this.x = newX;
      this.y = newY;
      this.energy--;
    }
  }

  mul() {
    const newCell = this.random(this.chooseCell(0));
    if (this.energy >= 10 && newCell) {
      const newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
      grassEaterArr.push(newGrassEater);
      matrix[newCell[1]][newCell[0]] = this.index;
      this.energy = 0;
    }
  }

  eat() {
    const grass = this.random(this.chooseCell(1));
    if (grass) {
      const newX = grass[0];
      const newY = grass[1];
      matrix[newY][newX] = this.index;
      matrix[this.y][this.x] = 0;
      for (let i = 0; i < grassArr.length; i++) {
        if (newX === grassArr[i].x && newY === grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
      this.energy++;
    }
  }

  die() {
    if (this.energy <= 2) {
      matrix[this.y][this.x] = 0;
      for (let i = 0; i < grassEaterArr.length; i++) {
        if (this.x === grassEaterArr[i].x && this.y === grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    }
  }
};
