const readlineSync = require('readline-sync');
const console = require('console');
const Deck = require('./../components/deck');
const Player = require('./../components/player');

class PlayingCardClient {
  constructor() {
    this.numPlayers = 0;
    this.playingDeck = new Deck();
    this.shuffleCount = 7; // 7 is optimal for ripple shuffling
    this.players = [];
  }

  GetUserInput() {
    this.numPlayers = readlineSync.question('How many players? ');
    console.log(`${this.numPlayers} player(s) selected\n`);
  }

  CreatePlayers(numPlayers) {
    for (let i = 1; i <= numPlayers; i += 1) {
      this.players.push(new Player(`Player ${i}`));
    }
  }

  SetUpGame() {
    this.playingDeck.Create();
    if (this.numPlayers < 1) {
      console.log('ERROR: Game requires at least one player!');
    } else if (this.numPlayers > this.playingDeck.cards.length) {
      console.log(`ERROR: There are ${this.numPlayers} players but only ${this.playingDeck.cards.length} cards`);
    } else {
      this.CreatePlayers(this.numPlayers);
      // this.playingDeck.Shuffle(this.shuffleCount);
      this.playingDeck.Deal(this.players);
    }
  }

  ShowAllHands() {
    this.players.forEach((player) => {
      console.log(`${player.name}'s hand:\n${player.hand.map(e => `${e.icon}`).join(', ')}`);
    });
  }
}

module.exports = PlayingCardClient;
