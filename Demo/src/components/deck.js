const console = require('console');
const PlayingCard = require('./card');

class Deck {
  constructor() {
    this.suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    this.cards = [];
  }

  CreateDeck() {
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.AddCard(suit, value);
      });
    });
  }

  AddCard(suit, value) {
    this.cards.push(new PlayingCard(suit, value));
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
    // reassemble deck from left and right packets using bool values
  } */

  ShowContents() {
    this.cards.forEach((card) => {
      console.log(`${card.value} of ${card.suit}`);
    });
  }
}

module.exports = Deck;

// unit tests
// - deck is created with complete set of cards
// - number of users receive equal amount of cards (remainder is kept in deck object?)
// - handle number of users is < 1
// - handle number of users is > 52
// - test shuffling?
// - deal to players until all cards run out
// - deal equally to players option?
// - show players hands
// - shuffle 4-7 times?
// - allow user to input number of shuffles?

// nice to have
// - different shuffle options user can select
// - GUI, or at least ASCII representation of cards / players

// Gilbert–Shannon–Reeds model
// An alternative description can be based on a property of the model,
// that it generates a permutation of the initial deck in which each card
// is equally likely to have come from the first or the second packet.[2]
// To generate a random permutation according to this model, begin by flipping
// a fair coin n times, to determine for each position of the shuffled deck
// whether it comes from the first packet or the second packet. Then split
// into two packets whose sizes are the number of tails and the number of heads
// flipped, and use the same coin flip sequence to determine from which packet
// to pull each card of the shuffled deck.
