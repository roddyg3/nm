const PlayingCard = require('./../components/card');

describe('PlayingCard Unit Tests', () => {
  test('Can create a playing card which retains input values', () => {
    const suit = 'Spades';
    const faceValue = 'Ace';
    const testCard = new PlayingCard(suit, faceValue);
    expect(testCard).toEqual({ suit, value: faceValue });
  });

  test('Unexpected suit is handled by MapSuit', () => {

  });
});
