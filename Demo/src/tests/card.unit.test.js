const PlayingCard = require('./../components/card');
const testData = require('./testData');

describe('PlayingCard Unit Tests', () => {
  let testCard = {};
  let expected = {};

  beforeEach(() => {
    [expected] = testData.sets.filter(t => t.name === 'PlayingCard');
    testCard = new PlayingCard(expected.model.suit, expected.model.value);
  });

  describe('Constructor', () => {
    test('Can create a playing card which retains input values', () => {
      expect(testCard).toEqual(
        { suit: expected.model.suit, value: expected.model.value, icon: expected.model.icon },
      );
    });
  });

  describe('MapSuit', () => {
    test('Suit is mapped to appropriate Unicode', () => {
      expect(testCard.MapSuit(testCard.suit)).toEqual(expected.results.MapSuit);
    });

    test('Default suit case is handled', () => {
      const defaultTest = new PlayingCard(expected.default.suit, expected.default.value);
      expect(defaultTest.MapSuit()).toEqual(expected.default.suit);
    });
  });

  describe('MapValue', () => {
    test('Value is mapped to appropriate letter', () => {
      expect(testCard.MapValue(testCard.value)).toEqual(expected.results.MapValue);
    });

    test('Default value case is handled', () => {
      const defaultTest = new PlayingCard(expected.default.suit, expected.default.value);
      expect(defaultTest.MapValue()).toEqual(expected.default.value);
    });
  });

  describe('getIcon', () => {
    test('Returns expected value', () => {
      expect(testCard.icon).toEqual(expected.model.icon);
    });
  });
});
