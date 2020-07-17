/*
 * Tic-Tac-Toe
 * An excuse to play with js, node, and Tensorflow ........
 *
 * Duck-Typing! Player must provide methods: select() and marker()
 * select:: markings -> idx in {0,..8} the index of the space selected
 * marker:: () -> marking (typically 'X' or 'O')
 *
 * To accomodate learning players we need to tell each player when a
 * new game starts, when a game ends and the result (win/lose/tie)
 * for each player.
 */

// function Game() {

exports.Game = function() {
  console.log('Game on, man!');

  // Markings indices are Left->Right, Top to bottom
  this.markings = ['','','','','','','','',''];
  this.players = [];
  this.current = 0; // Current player
  this.finished = false;

  this.reset = function() {
    this.current = 0;
    this.markings = ['','','','','','','','',''];
    this.finished = false;
  }

  this.addPlayer = function(p) {
    this.players.push(p);
  }

  // Check row r in {0,1,2} -> Bool
  this.fullRow = function(r) {
    return this.markings[3*r] == this.markings[3*r+1] &&
           this.markings[3*r] == this.markings[3*r+2] &&
           this.markings[3*r] != '';
  }

  // Check column c in {0,1,2} -> Bool
  this.fullColumn = function(c) {
    return this.markings[c] == this.markings[c+3] && // Check colomns
           this.markings[c] == this.markings[c+6] &&
           this.markings[c] != '';
  }

  // Check the lead diagonal (TL -> BR)
  this.fullLeadDiagonal = function() {
    return this.markings[0] == this.markings[4] &&
           this.markings[0] == this.markings[8] &&
           this.markings[0] != '';
  }

  // Check the off-diagonal (BL->TR)
  this.fullOffDiagonal = function() {
    return this.markings[2] == this.markings[4] &&
           this.markings[2] == this.markings[6] &&
           this.markings[2] != '';
  }

  // Returns false or the winning symbol !!
  // TODO:: Rewrite this shit !!
  this.isFinished = function() {
    // Default value
    let winner = 'None';
    if ( this.markings[0] == this.markings[1] &&         // Check rows
         this.markings[0] == this.markings[2] &&
         this.markings[0] != '' ) {
      winner = this.markings[0];
      this.finished = true;
    } else if ( this.markings[3] == this.markings[4] &&
                this.markings[3] == this.markings[5] &&
                this.markings[3] != '' ) {
      winner = this.markings[3];
      this.finished = true;
    } else if ( this.markings[6] == this.markings[7] &&
                this.markings[6] == this.markings[8] &&
                this.markings[6] != '' ) {
      winner = this.markings[6];
      this.finished = true;
    } else if ( this.markings[0] == this.markings[3] && // Check colomns
                this.markings[0] == this.markings[6] &&
                this.markings[0] != '' ) {
      winner = this.markings[0];
      this.finished = true;
    } else if ( this.markings[1] == this.markings[4] &&
                this.markings[1] == this.markings[7] &&
                this.markings[1] != '' ) {
      winner = this.markings[1];
      this.finished = true;
    } else  if ( this.markings[2] == this.markings[5] &&
                 this.markings[2] == this.markings[8] &&
                 this.markings[2] != '' ) {
      winner = this.markings[2];
      this.finished = true;
    } else  if ( this.markings[0] == this.markings[4] && // Diagonals
                 this.markings[0] == this.markings[8] &&
                 this.markings[0] != '' ) {
      winner = this.markings[0];
      this.finished = true;
    } else  if ( this.markings[2] == this.markings[4] &&
                 this.markings[2] == this.markings[6] &&
                 this.markings[2] != '' ) {
      winner = this.markings[2];
      this.finished = true;
    } else if (this.markings.indexOf('') == -1) {
      // Game is tied
      winner = 'Tie'
      this.finished = true;
    }
    return winner;
  }

  this.playOne = function() {
//      console.log('Playing: ', this.players[this.current].marker);

    // Select move (payers will have different strategies)
    let idx = this.players[this.current].select(this.markings);
    this.markings[idx] = this.players[this.current].marker();
//    this.current = (this.current + 1) % this.players.length;
  }

  // TODO:: Rewrite this horrible function
  this.playGame = function() {
    while ( !this.finished ) {
      this.playOne();
      let status = this.isFinished();
//      console.log(status);
//      console.log(this.markings);
      if (status == 'None') {
        // No winner .. continue: Next player becomes current
        this.current = (this.current + 1) % this.players.length;
      } else {
        console.log(status == 'Tie' ? status : 'Winner: '+status);
        // If a tie - inform all players
        // Otherwise inform winner and loser(s) (for more general games)
        if (status == 'Tie') {
          this.players.forEach(p => p.result('Tie'));
        } else {
          this.players[this.current].result('Win');
          this.players.filter((p,i) => i != this.current).map(p => p.result('Lose'));
        }
      }
    }
  }

  // To accomodate Learning
  this.newGame = function() {
    this.players.forEach(p => p.newGame());
  }

  this.reset();
}

//let game = new Game();
