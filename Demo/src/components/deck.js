const console = require('console');
const PlayingCard = require('./card');

class Deck {
  constructor() {
    this.suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    this.cards = [];
  }

  Create() {
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.AddCard(suit, value);
      });
    });
  }

  AddCard(suit, faceValue) {
    this.cards.push(new PlayingCard(suit, faceValue));
  }

  Shuffle(count) {
    for (let i = 0; i < count; i += 1) {
      this.RiffleShuffle();
    }
  }
  /*
  RiffleShuffle() {
    const deckSize = this.cards.length / 2;
    const leftPacket = this.cards.slice(0, deckSize);
    const rightPacket = this.cards.slice(deckSize, this.cards.length);
    // random bool value that matches total size of complete deck
    var randomNumber = Math.random() >= 0.5;
    // reassemble deck from left and right packets using bool values
  } */

  Deal(players) {
    const deckSize = this.cards.length;
    for (let i = 0; i < deckSize; i += 1) {
      const currentPlayer = players[i % players.length];
      currentPlayer.AddToHand(this.cards[0]);
      this.cards.shift();
    }
  }

  ShowContents() {
  //  this.cards.forEach((card) => {
  //    console.log(`${card.value} of ${card.suit}`);
  //  });

    console.log(this.cards.map(e => `${e.value} of ${e.suit}`).join(', '));
  }
}

module.exports = Deck;
