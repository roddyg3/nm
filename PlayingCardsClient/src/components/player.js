/**
 * Simple class to store playerName and cards in hand
 */
class Player {
  constructor(playerName) {
    this.name = playerName;
    this.hand = [];
  }

  AddToHand(playingCard) {
    this.hand.push(playingCard);
  }
}

module.exports = Player;
