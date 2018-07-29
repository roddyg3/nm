const PlayingCard = require('./../components/card');

describe('PlayingCard Unit Tests', () => {
  describe('Constructor', () => {
    test('Can create a playing card which retains input values', () => {
      const suit = 'Spades';
      const faceValue = 'Ace';
      const testCard = new PlayingCard(suit, faceValue);
      expect(testCard).toEqual({ suit, value: faceValue });
    });
  });

  describe('MapSuit', () => {
    test('Suit is mapped to appropriate Unicode', () => {

    });

    test('Default suit case is handled', () => {

    });
  });

  describe('MapValue', () => {
    test('Value is mapped to appropriate letter', () => {

    });

    test('Default value case is handled', () => {

    });
  });

  describe('icon property', () => {
    test('getter returns expected value', () => {

    });

    test('setter sets expected value', () => {

    });
  });
});
