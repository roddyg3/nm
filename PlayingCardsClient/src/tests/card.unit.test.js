const PlayingCard = require('./../components/card');
const testData = require('./testData');

describe('PlayingCard Unit Tests', () => {
  let testCard = {};
  let defaultTest = {};
  const [expected] = testData.sets.filter(t => t.name === 'PlayingCard');

  beforeEach(() => {
    testCard = new PlayingCard(expected.model.suit, expected.model.value);
    defaultTest = new PlayingCard(expected.default.suit, expected.default.value);
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
      expect(defaultTest.MapSuit()).toEqual(expected.default.suit);
    });
  });

  describe('MapValue', () => {
    test('Value is mapped to appropriate letter', () => {
      expect(testCard.MapValue(testCard.value)).toEqual(expected.results.MapValue);
    });

    test('Default value case is handled', () => {
      expect(defaultTest.MapValue()).toEqual(expected.default.value);
    });
  });

  describe('getIcon', () => {
    test('Returns expected result for mapped values', () => {
      expect(testCard.icon).toEqual(expected.model.icon);
    });
    test('Returns expected result for unmapped values', () => {
      expect(defaultTest.icon).toEqual(`${defaultTest.value}${defaultTest.suit}`);
    });
  });
});
