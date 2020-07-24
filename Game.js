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
 *
 * Protocol for playing the game is
 *
 * reset()
 * newGame()
 * playOne()
 */




// function Game() {

exports.Game = function() {
  console.log('Game on, man!');

  // Markings indices are Left->Right, Top to bottom
  this.markings = ['','','','','','','','',''];
  this.players = [];
  this.current = 0; // Current player
  this.finished = false;
  this.winner = undefined; // Winner or 'Tie'

  // Pretty print the board
  this.print = function() {
    tmp = this.markings.map(e => e == '' ? '.' : e);
    console.log(tmp[0] + tmp[1] + tmp[2]);
    console.log(tmp[3] + tmp[4] + tmp[5]);
    console.log(tmp[6] + tmp[7] + tmp[8] + '\n');
  }

  // Puts the game back to starting state -- Could be part of newGame() !!
  this.reset = function() {
    this.current = 0;
    this.markings = ['','','','','','','','',''];
    this.finished = false;
  }

  this.addPlayer = function(p) {
    this.players.push(p);
    p.game = this;
  }

  // To accomodate Learning - called before play starts
  this.newGame = function() {
    this.players.forEach(p => p.newGame());
  }

  // Game is finished, but if the other player won on the last move Otherwise
  // player has no chance to learn from that loss --  the endGame() function
  // remedies this problem
  this.endGame = function() {
    this.players.forEach(p => p.endGame());
  }

  // Randomize first player
  this.setRandomFirstPlayer = function() {
    this.current = Math.floor(Math.random() * this.players.length);
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
      // Inform players of new game
      // Put this into the game server at the same level as reset() and print()
      // this.newGame();

      // Print out first player
      //console.log('First player: ' + this.players[this.current].marker());

      while ( !this.finished ) {
        this.playOne();
        let status = this.isFinished();
  //      console.log(status);
  //      console.log(this.markings);
  //      this.print();
        if (status == 'None') {
          // No winner .. continue: Next player becomes current
          this.current = (this.current + 1) % this.players.length;
        } else {
  //        console.log(status == 'Tie' ? status : 'Winner: '+status);
          this.winner = status;
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


  /*
   * Functions for implementing the rules
   */

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
  // TODO:: Rewrite this shit !! Replace it by result (below)
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


  this.reset();

  // Function to dtermine the result of a given game state.
  // For learning players .. Players need a reference to the game to use this
  // TODO: Rewrite this to use the row/column functions above
  this.result = function(markings) {
    let winner = 'None';
    if ( markings[0] == markings[1] &&         // Check rows
         markings[0] == markings[2] &&
         markings[0] != '' ) {
      winner = markings[0];
    } else if ( markings[3] == markings[4] &&
                markings[3] == markings[5] &&
                markings[3] != '' ) {
      winner = markings[3];
    } else if ( markings[6] == markings[7] &&
                markings[6] == markings[8] &&
                markings[6] != '' ) {
      winner = markings[6];
    } else if ( markings[0] == markings[3] && // Check colomns
                markings[0] == markings[6] &&
                markings[0] != '' ) {
      winner = markings[0];
    } else if ( markings[1] == markings[4] &&
                markings[1] == markings[7] &&
                markings[1] != '' ) {
      winner = markings[1];
    } else  if ( markings[2] == markings[5] &&
                 markings[2] == markings[8] &&
                 markings[2] != '' ) {
      winner = markings[2];
    } else  if ( markings[0] == markings[4] && // Diagonals
                 markings[0] == markings[8] &&
                 markings[0] != '' ) {
      winner = markings[0];
    } else  if ( markings[2] == markings[4] &&
                 markings[2] == markings[6] &&
                 markings[2] != '' ) {
      winner = markings[2];
    } else if (markings.indexOf('') == -1) {
      // Game is tied
      winner = 'Tie'
    }
    return winner;
  }
}

//let game = new Game();
