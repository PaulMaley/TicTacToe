/*
 * Game server
 */

 Game = require('./Game');
 RandomPlayer = require('./RandomPlayer')
 QPlayer = require('./QPlayer')

 function GameServer() {
   console.log('Game server running');

   game = new Game.Game();
   game.addPlayer(new QPlayer.QPlayer('O', game));
   game.addPlayer(new RandomPlayer.RandomPlayer('X', game));
//   game.addPlayer(new RandomPlayer.RandomPlayer('X', game));

  // Statistics
  let m = 50;
  while (m > 0) {
    stats = {Tie:0, X:0, O:0};
    let n = 100000;
    while (n > 0) {
      game.reset();   // If this is not the first game, reset the board
      game.newGame(); // Inform players of new game
      game.setRandomFirstPlayer();

      result = game.playGame(); // Play one game
      //game.print();          // Visualization of the game

      // For curiosity
//      console.log('VTable: ' + game.players[0].VTable[game.players[0].code(['O','O','','X','X','O','X','',''])]);


      //console.log('Result: ' + game.winner);
      stats[game.winner] += 1;
      n--;
    }
    console.log(stats);
    m--;
  }
  // End of game ... VTABLE ??
  console.log(game.players[0].VTable[game.players[0].code(['O','','X','','','','','',''])],
              game.players[0].VTable[game.players[0].code(['X','O','X','','','','','',''])],
              game.players[0].VTable[game.players[0].code(['X','','O','','','','','',''])]);
  console.log(game.players[0].VTable[game.players[0].code(['X','','','O','','','','',''])],
              game.players[0].VTable[game.players[0].code(['X','','','','O','','','',''])],
              game.players[0].VTable[game.players[0].code(['X','','','','','O','','',''])]);
  console.log(game.players[0].VTable[game.players[0].code(['X','','','','','','O','',''])],
              game.players[0].VTable[game.players[0].code(['X','','','','','','','O',''])],
              game.players[0].VTable[game.players[0].code(['X','','','','','','','','O'])]);


}
server = new GameServer();
