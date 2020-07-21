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


exports.QPlayer = function(marking, game) {
  this.marking = marking;
  this.learning = true;  // Assume that we create an unlearned player
                         // TODO: modify to be able to read in a Qtable
  this.game = game;      // Reference to the game engine
  this.previousState = [];    // This is the state that existed the
                                     // last time that this player played.

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

  // Value table: value assigned to each state
  // Prefill to 0.5 and then set losing states to 0 and winning to 1
  // Most of the "states" in the table are unreachable !!
  this.VTable = new Array(20000).fill(0.5);

  // For each state the player needs to evaluate whether its a Win/Lose/Tie
  // or other (non terminal)
  // Idiot level definition of initial values
  let L = ['','X','O'];
  for(a0 in L) {
    for(a1 in L) {
      for(a2 in L) {
        for(a3 in L) {
          for(a4 in L) {
            for(a5 in L) {
              for(a6 in L) {
                for(a7 in L) {
                  for(a8 in L) {
                    m = [L[a0],L[a1],L[a2],L[a3],L[a4],L[a5],L[a6],L[a7],L[a8]];
                    idx = this.code(m);
                    r = this.game.result(m);
                    // console.log(m + ' => ()'+ idx + ',' + r + ')');
                    if (r != 'None' && r == this.marking ) {
                      //console.log('Win: ' + m);
                      this.VTable[idx] = 1.0;
                    }  else if (r != 'None' && r != this.marking ) {
                      this.VTable[idx] = 0.0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Function to decide whether to play a random move or a policy move
  this.playRandom = function() {
    // Fixed value ... (10% random)
    return (Math.random() < 0.1);
  }

  // Return the code for the state s': the state arising from
  // the current state (marking) and the selection of a cell (idx)
  this.postcode = function(markings, idx) {
//    return this.code(markings) + (this.marking == 'X' ? 1 : 2)*(3**idx);
// TODO: Is line above wrong ???? I think so ... look at defn above !! (code)
    return this.code(markings) + (this.marking == 'O' ? 1 : 2)*(3**idx);
  }

  // How the player selects its move depends upon wheather is is learning or not
  this.select = function(markings) {
//    selection = undefined;
//    state = this.code(markings);
    actions = markings.map((e,i) => e == '' ? i : -1).filter(i => i != -1);
    // Select move (max value or random)
    if ( this.playRandom() ) {
      selection = actions[Math.floor(Math.random() * actions.length)]
      // No Table update
    } else {
      // Select on the basis of the value table
      // Map each action into a new state, and get the value for that state
      // Then order (descending) the available actions according to the value table
      orderedActions = actions.map(a => [a, this.VTable[this.postcode(markings,a)]]).sort(
        (x1,x2) =>  (x1[1] > x2[1]) ? -1 : 0);
      //console.log('State: ' + markings + ', Actions: ' + orderedActions);
      selection = orderedActions[0][0];
      //console.log(orderedActions[0][1]); // Should be 1 for the last move ...
      // Update VTable
      idxp = this.code(this.previousState);
      idx = this.postcode(markings, selection);
      //console.log('Value (pre): ' + this.VTable[idxp]);
      this.VTable[idxp] += 0.1 * (this.VTable[idx] - this.VTable[idxp]);
      //console.log('Value (post): ' + this.VTable[idxp]);
    }
    return selection;
  }

  this.newGame = function() {
    // Learner needs to know the previous state (B4 opponents moce)
    // Initialise it here
    //console.log(this.game);
    this.previousState = ['','','','','','','','',''];//Array.from(this.game.marking);
  }

  this.result = function(r) {
    //console.log('Result for QPlayer ' + this.marking + ': ' + r);
  }


}
