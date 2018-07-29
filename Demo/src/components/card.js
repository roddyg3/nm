/**
 * PlayingCard class to represent and store card details
 */
class PlayingCard {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get icon() {
    return `${this.MapValue(this.value) + this.MapSuit(this.suit)}`;
  }

  set icon(s) {
    return this.s;
  }

  /**
   * Map suit to its Unicode symbol
   */
  MapSuit(suit) {
    switch (suit) {
      case 'Clubs':
        return '\u2663';
      case 'Diamonds':
        return '\u2666';
      case 'Spades':
        return '\u2660';
      case 'Hearts':
        return '\u2665';
      default:
        return this.suit;
    }
  }

  /**
   * Map alpha face value to its abbreviation
   */
  MapValue(value) {
    switch (value) {
      case 'Jack':
        return 'J';
      case 'Queen':
        return 'Q';
      case 'King':
        return 'K';
      case 'Ace':
        return 'A';
      default:
        return this.value;
    }
  }
}

module.exports = PlayingCard;
