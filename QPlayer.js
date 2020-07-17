/*
 * First attempt at a player that learns
 * Tabular Q-Learning
 * taken from: https://medium.com/@carsten.friedrich/part-3-tabular-q-learning-a-tic-tac-toe-player-that-gets-better-and-better-fa4da4b0892a
 * (nice RUL !!)
 *
 * Remember duck-typing: marker() and select(markings)
 *
 * The idea is straight forward: to each pair (state, action) assign a value
 * indicating wheather its a good action to take in that state or not, i.e.
 * will it increase my chances of winning. In a given state the player takes
 * the action with the highest value.
 * Learning consists of playing games and modifying this table of values as
 * experience is gained.
 *
 * Problem 1: Encode the state.
 * Problem 2: State -> possible actions.
 * Problem 3: Learning.
 *
 */


QPlayer = function(marking) {
  this.marking = marking;
  this.learning = true;  // Assume that we create an unlearned player
                         // TODO: modify to be able to read in a Qtable

  this.marker = function() {
    return this.marking;
  }

  /*
   * Problem 1: Hash the markings. There are (less than) 3^9 possible states
   * 3^9 < 20 000 so not so many.
   * So how to transform ['X','','','O','','X','','','O'] into a number in
   * [0,20000] or there abouts... Simply count in base 3??
   * Map: {''->0, 'O'->1, 'X'->2} then code = sum i = 0 to 8 marking[i]*3^i.
   */
  this.code = function(markings) {
    coeffs = markings.map(m => m == '' ? 0 : (m == 'O' ? 1 : 2) );
    return coeffs.reduce((a,e,i) => a + e*3**i, 0);
  }

  // Lots of entries should be N/A (you can't write in a taken cell)
  this.Qtable = new Array(20000).fill(0).map(e => new Array(2).fill(0));

  // How the player selects its move depends upon wheather is is learning or not
  this.select = function(markings) {
    state = this.code(markings);
    actions = markings.map((e,i) => e == '' ? i : -1).filter(i => i != -1);
    if (learning) {
      // Select move (max value or random)
    } else {
      // Select move solely on the basis of the Qtable
      
    }
  }
}
