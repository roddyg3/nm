// create deck
// for each suit create a card with each value
// shuffle deck
// get number of players
// deal equal cards to each player
// display results of deal

const PlayingCardClient = require('./client/playingCard.client');

const cardClient = new PlayingCardClient();
cardClient.GetUserInput();
cardClient.SetUpGame();
cardClient.ShowAllHands();
