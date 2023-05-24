const LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {
  mul() {
    this.multiply++;
    const newCell = this.random(this.chooseCell(0));
    if (this.multiply >= 8 && newCell) {
      const newGrass = new Grass(newCell[0], newCell[1], this.index);
      grassArr.push(newGrass);
      matrix[newCell[1]][newCell[0]] = this.index;
      this.multiply = 0;
    }
  }
};
