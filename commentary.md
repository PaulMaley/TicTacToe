## Commentary ...

1. Confusion in the abstraction of game: sometimes it refers to the set of rules (fixed)
sometimes to a particular game in play (with an evolving state)
1. This is a problem because of the reference to 'game' passed to the players. The
players need a reference to the game rules in order to initialise properly, but then
each time we start a new game we want to add the players to it (suitable reset) because
we may want to vary the order of play!
1. In other words need to specify correctly the game playing protocol
(calls to newGame(), endGame(), etc.) and modify the interfaces/code accordingly
(Follow General Game Playing ... obviously)
1. The result of the last move can never be **lose**. Player 'X' loses only
when player 'O' wins by making the last move. How can we have V(s^prime)=0
then?
1. So **maybe** if S is the present state then
S^prime is the state reached by taking action a and then
the opponent taking their move. This means we have more
than one S^prime and need to combine them somehow.
 
