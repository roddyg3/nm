const readlineSync = require('readline-sync');
const console = require('console');
const Deck = require('./../components/deck');
const Player = require('./../components/player');

/**
 * PlayingCardClient for game management and console i/o
 */
class PlayingCardClient {
  constructor() {
    this.numPlayers = 0;
    this.playingDeck = new Deck();
    // 7 is optimal for ripple shuffling
    this.shuffleCount = 7;
    this.players = [];
  }

  SetUpGame() {
    this.GetPlayerInput();
    this.SetUpDeck();
    if (!this.CheckForInvalidPlayers()) {
      this.CreatePlayers(this.numPlayers);
      this.ShuffleAndDeal(this.shuffleCount, this.players);
      this.ShowPlayersHands();
    }
  }

  GetPlayerInput() {
    this.numPlayers = readlineSync.questionInt('How many players? ');
    console.log(`${this.numPlayers} player(s) selected\n`);
  }

  CreatePlayers(numPlayers) {
    for (let i = 1; i <= numPlayers; i += 1) {
      this.players.push(new Player(`Player ${i}`));
    }
  }

  SetUpDeck() {
    this.playingDeck.Create();
    console.log('The following deck was created:');
    this.playingDeck.ShowContents();
  }

  ShuffleAndDeal(shuffleCount, players) {
    this.playingDeck.Shuffle(shuffleCount);
    console.log('Shuffle results:');
    this.playingDeck.ShowContents();
    this.playingDeck.Deal(players);
  }

  CheckForInvalidPlayers() {
    let isInvalid = true;
    const players = parseInt(this.numPlayers, 10);

    if (players > 0 && players <= this.playingDeck.getDeckSize()) {
      isInvalid = false;
    } if (this.numPlayers < 1) {
      console.error('ERROR: Game requires at least one player!');
    } else if (this.numPlayers > this.playingDeck.getDeckSize()) {
      console.error(`ERROR: There are ${this.numPlayers} players but only ${this.playingDeck.cards.length} cards.`);
    } else if (Number.isNaN(parseInt(this.numPlayers, 10))) {
      console.error('ERROR: Invalid value for number of players.');
    }

    return isInvalid;
  }

  ShowPlayersHands() {
    this.players.forEach((player) => {
      if (player.hand.length > 0) {
        console.log(`${player.name}'s hand:\n${player.hand.map(e => `${e.icon}`).join(', ')}`);
      } else {
        console.log(`${player.name}'s hand is empty!`);
      }
    });
  }
}

module.exports = PlayingCardClient;
