const console = require('console');
const PlayingCard = require('./card');

/**
 * Deck class for handling card array creation and manipulation
 */
class Deck {
  constructor() {
    this.suits = [
      'Clubs', 'Diamonds', 'Spades', 'Hearts',
    ];
    this.values = [
      '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace',
    ];
    this.cards = [];
    this.shuffleOrder = [];
  }

  getDeckSize() {
    return this.cards.length;
  }

  /**
   * Create the deck using all combinations of suits and values
   */
  Create() {
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.cards.push(new PlayingCard(suit, value));
      });
    });
  }

  /**
   * Call shuffle technique based on passed in count
   */
  Shuffle(count) {
    for (let i = 0; i < count; i += 1) {
      this.RiffleShuffle();
    }
  }

  /**
   * Riffle shuffle technique that implements Gilbert–Shannon–Reeds model
   * 1. Set value ('left' or 'right') for each card in deck
   * 2. Determine packet sizes for deck-splitting based on value subtotals
   * 3. Split cards into two parts using shuffleOrder counts
   * 4. Reassemble deck from left and right packets using shuffleOrder
   */
  RiffleShuffle() {
    this.SetShuffleOrder(this.getDeckSize());

    const leftPacketSize = this.shuffleOrder.filter(l => l === 'left').length;
    const rightPacketSize = this.shuffleOrder.filter(r => r === 'right').length;

    const leftPacket = this.cards.splice(0, leftPacketSize);
    const rightPacket = this.cards.splice(0, rightPacketSize);

    for (let i = 0; i < this.shuffleOrder.length; i += 1) {
      if (this.shuffleOrder[i] === 'left') {
        this.cards.push(leftPacket[0]);
        leftPacket.shift();
      } else if (this.shuffleOrder[i] === 'right') {
        this.cards.push(rightPacket[0]);
        rightPacket.shift();
      }
    }
  }

  /**
   * Cycle through the deck of cards and deal to each player round-robin
   */
  Deal(players) {
    const totalCards = this.getDeckSize();

    for (let i = 0; i < totalCards; i += 1) {
      const currentPlayer = players[i % players.length];
      currentPlayer.AddToHand(this.cards[0]);
      this.cards.shift();
    }
  }

  /**
   * Display deck contents using icons
   */
  ShowContents() {
    console.log(`${this.cards.map(e => `${e.icon}`).join(', ')}\n`);
  }

  /**
   * Set shuffleOrder based on numCards passed
   */
  SetShuffleOrder(numCards) {
    this.shuffleOrder = [];

    for (let i = 0; i < numCards; i += 1) {
      const packet = Math.random() >= 0.5 ? 'left' : 'right';
      this.shuffleOrder.push(packet);
    }
  }
}

module.exports = Deck;
