const testData = require('./testData');
const Deck = require('./../components/deck');
const PlayingCard = require('./../components/card');
const Player = require('./../components/player');

describe('Deck Unit Tests', () => {
  let testDeck = {};

  beforeEach(() => {
    testDeck = new Deck();
  });

  describe('constructor()', () => {
    test('All suits are defined', () => {
      expect(testDeck.suits.sort()).toEqual(testData.expectedSuits.sort());
    });

    test('All face values are defined', () => {
      expect(testDeck.values.sort()).toEqual(testData.expectedFaceValues.sort());
    });
  });

  describe('Create()', () => {
    test('Adds cards to a deck', () => {
      expect(testDeck.cards.length).toBeLessThanOrEqual(0);
      testDeck.Create();
      expect(testDeck.cards.length).toBeGreaterThan(0);
      expect(testDeck.cards).toContainEqual(
        new PlayingCard(
          testData.expectedSuits[0],
          testData.expectedFaceValues[0],
        ),
      );
    });

    test('Spawns expected number of cards', () => {
      testDeck.Create();
      const expectedNumCards = testData.expectedSuits.length * testData.expectedFaceValues.length;
      expect(testDeck.cards.length).toEqual(expectedNumCards);
    });
  });

  describe('Shuffle()', () => {
    test('Changes card order', () => {
      testDeck.Create();
      const originalOrder = testDeck.cards.slice(0, testDeck.cards.length);
      testDeck.Shuffle(1);
      expect(testDeck.cards).not.toEqual(originalOrder);
    });
  });

  describe('Deal()', () => {
    let players = [];
    beforeEach(() => {
      players = [new Player('Player 1'), new Player('Player 2')];
    });

    test('Distributes cards to all players', () => {
      testDeck.Create();
      expect(players[0].hand.length).toEqual(0);
      expect(players[1].hand.length).toEqual(0);
      testDeck.Deal(players);
      expect(players[0].hand.length).toBeGreaterThan(0);
      expect(players[1].hand.length).toBeGreaterThan(0);
    });

    test('Distributes all cards in the deck', () => {
      testDeck.Create();
      expect(testDeck.cards.length).toBeGreaterThan(0);
      testDeck.Deal(players);
      expect(testDeck.cards.length).toEqual(0);
    });
  });
});
