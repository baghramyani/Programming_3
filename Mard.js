const LivingCreature = require("./LivingCreature");

module.exports = class Mard extends LivingCreature {
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
      this.energy -= 2;
    }
  }

  mul() {
    const newCell = this.random(this.chooseCell(0));
    if (this.energy >= 30 && newCell) {
      const newMard = new Mard(newCell[0], newCell[1], this.index);
      mardArr.push(newMard);
      matrix[newCell[1]][newCell[0]] = this.index;
      this.energy++;
    }
  }

  eat() {
    const kendani = this.random(this.chooseCell(3));
    if (kendani) {
      const newX = kendani[0];
      const newY = kendani[1];
      matrix[newY][newX] = this.index;
      matrix[this.y][this.x] = 0;
      for (let i = 0; i < kendaniArr.length; i++) {
        if (newX === kendaniArr[i].x && newY === kendaniArr[i].y) {
          kendaniArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
      this.energy += 2;
    }
  }

  die() {
    if (this.energy < 0) {
      matrix[this.y][this.x] = 0;
      for (let i = 0; i < mardArr.length; i++) {
        if (mardArr[i].x === this.x && mardArr[i].y === this.y) {
          mardArr.splice(i, 1);
          break;
        }
      }
    }
  }
};
