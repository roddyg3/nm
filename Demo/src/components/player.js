const console = require('console');

class Player {
  constructor(playerName) {
    this.name = playerName;
    this.hand = [];
  }

  AddToHand(playingCard) {
    this.hand.push(playingCard);
  }

  ShowHand() {
    if (this.hand.length === 0) {
      console.log(`${this.playerName}'s hand is empty.`);
    }
    this.hand.forEach();
  }
}

module.exports = Player;
