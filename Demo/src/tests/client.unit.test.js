const PlayingCardClient = require('./../client/playingCard.client');

describe('PlayingCardClient Unit Tests', () => {
  test('User input is stored', () => {
    const cardClient = new PlayingCardClient();
    cardClient.GetUserInput();
    expect(cardClient.numPlayers).toEqual(4);
    // use robotjs?
  });
});
