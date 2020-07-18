/*
 * Random player : selects a free square randomly.
 *
 */

exports.RandomPlayer = function(marking, game) {
  this.marking = marking;
  this.game = undefined; // Unused reference to the game itself

  this.marker = function() {
    return this.marking
  }

  this.select = function(markings) {
    let freeList = markings.map((e,i) => e == '' ? i : -1).filter(i => i != -1);
//     console.log(freeList);
    return freeList[Math.floor(Math.random() * freeList.length)];
  }

  this.newGame = function() {/* Dummy method for random player */}

  this.result = function(r) {
    //console.log('Result for RPlayer ' + this.marking + ': ' + r);
  }
}
