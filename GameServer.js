/*
 * Game server
 */

 Game = require('./Game');
 RandomPlayer = require('./RandomPlayer')

 function GameServer() {
   console.log('Game server running');

   game = new Game.Game();
   game.addPlayer(new RandomPlayer.RandomPlayer('O'));
   game.addPlayer(new RandomPlayer.RandomPlayer('X'));

   game.playGame();
 }

 server = new GameServer();
