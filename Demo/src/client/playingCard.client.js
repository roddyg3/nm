const readlineSync = require('readline-sync');
const console = require('console');
const Deck = require('./../components/deck');

class PlayingCardClient {
  constructor() {
    this.numPlayers = 0;
    this.playingDeck = new Deck();
    this.shuffleCount = 7; // 7 is optimal for ripple shuffling
  }

  GetUserInput() {
    this.numPlayers = readlineSync.question('How many players? ');
    console.log(`${this.numPlayers} player(s) selected`); // debug
  }

  SetUpGame() {
    this.playingDeck.CreateDeck();
    this.playingDeck.Shuffle(this.shuffleCount);
    this.playingDeck.Deal(this.numPlayers);
  }
}

module.exports = PlayingCardClient;
