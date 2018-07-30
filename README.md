# PlayingCardsClient
Node.js console application that creates a deck of cards, shuffles them, and distributes them to the user-specified number of players.

Card shuffling is performed by simulating the ripple shuffle method, following the Gilbert–Shannon–Reeds model (https://en.wikipedia.org/wiki/Gilbert%E2%80%93Shannon%E2%80%93Reeds_model):

"To generate a random permutation according to this model, begin by flipping a fair coin n times, to determine for each position of the shuffled deck whether it comes from the first packet or the second packet. Then split into two packets whose sizes are the number of tails and the number of heads flipped, and use the same coin flip sequence to determine from which packet to pull each card of the shuffled deck."

Unit tests utilize Jest.

This is my first Node.js project. Please enjoy! :)
