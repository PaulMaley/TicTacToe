/*
 * Game server
 */

 Game = require('./Game');
 RandomPlayer = require('./RandomPlayer')
 QPlayer = require('./QPlayer')

 function GameServer() {
   console.log('Game server running');

   game = new Game.Game();
   game.addPlayer(new RandomPlayer.RandomPlayer('O', game));
   game.addPlayer(new QPlayer.QPlayer('X', game));
   //game.addPlayer(new RandomPlayer.RandomPlayer('X', game));

  // Statistics
  let m = 10;
  while (m > 0) {
    stats = {Tie:0, X:0, O:0};
    let n = 100;
    while (n > 0) {
      result = game.playGame();
//     console.log('Result: ' + game.winner);
      stats[game.winner] += 1;
//     game.print();
      game.reset();
      n--;
    }
    console.log(stats);
    m--;
  }
}
server = new GameServer();
