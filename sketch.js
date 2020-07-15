let board = {
  width: 300,
  height: 300,
//  markings: [['X','','O'],['','O',''],['X','','']]
  markings: ['','','','','','','','',''],
  players: [],
  current: 0, // Current player
  finished: false
}

  board.reset = function() {
    this.current = 0;
    this.markings = ['','','','','','','','',''];
    this.finished = false;
  }

  // Draw the board
  board.draw = function(){
    stroke(3);
    line(0,board.height/3,width,height/3);
    line(0,2*height/3,width,2*height/3);
    line(width/3,0, width/3,height); 
    line(2*width/3,0, 2*width/3,height); 
    
    textAlign(CENTER,CENTER);
    textSize(64);
    board.markings.forEach(
      function(m,i){
        x = (i % 3) * width/3 + width/6;
        y = floor(i/3)*height/3 + height/6;
        text(m, x, y);
    });
  }

  board.addPlayer = function(p) {
    this.players.push(p);
  }

  // Returns false or the winning symbol !!
  board.isFinished = function() {
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
      winner = this.markings[3];
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


  // Make a play
  board.playOne = function() {
    console.log('Playing: ',
      this.players[this.current].marker);
    
    // Select move (payers will have different strategies)
    let idx = this.players[this.current].select(this.markings);
    this.markings[idx] = this.players[this.current].marker;
    
    this.current = (this.current + 1) % this.players.length;  
  }
  

  // Player objects
  function Player(marker) {
    this.marker = marker;
    this.select = function(markings) {
      // Random selection !! 
      let freeList = markings.map((e,i) => e == '' ? i : -1).filter(i => i != -1);
      console.log(freeList);
      return freeList[Math.floor(Math.random() * freeList.length)];
    };
  }






function setup() {
  createCanvas(board.width, board.height);
  
  board.addPlayer(new Player('O'));
  board.addPlayer(new Player('X'));

  board.players.forEach(p => console.log(p.marker));
}

function draw() {
  background(220);
  board.draw();
}

function mousePressed() {
  if ( !board.finished ) {
    board.playOne();
    let status = board.isFinished();
    if (status == 'None') {
      // No winner .. continue
    } else {
      console.log(status == 'Tie' ? status : 'Winner: '+status);
    }  
  } else {
    board.reset();
    board.draw();
  }
}