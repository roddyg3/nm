const console = require('console');
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

    test('Initial deck is empty', () => {
      expect(testDeck.cards.length).toEqual(0);
    });

    test('ShuffleOrder is empty', () => {
      expect(testDeck.shuffleOrder.length).toEqual(0);
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

    test('Adds all expected combinations', () => {
      const expectedCards = [];
      testDeck.Create();
      testData.expectedSuits.forEach((s) => {
        testData.expectedFaceValues.forEach((v) => {
          expectedCards.push({ suit: s, value: v });
        });
      });
      expect(testDeck.cards.length).toEqual(expectedCards.length);
      for (let i = 0; i < testDeck.cards.length; i += 1) {
        expect(expectedCards).toContainEqual(
          { suit: testDeck.cards[i].suit, value: testDeck.cards[i].value },
        );
      }
    });
  });

  describe('Shuffle()', () => {
    beforeEach(() => {
      testDeck.RiffleShuffle = jest.fn();
      testDeck.Create();
    });

    test('Iterates expected number of times', () => {
      testDeck.Shuffle(3);
      expect(testDeck.RiffleShuffle).toHaveBeenCalledTimes(3);
    });

    test('Does nothing if count < 1', () => {
      const originalOrder = testDeck.cards.slice(0, testDeck.cards.length);
      testDeck.Shuffle(0);
      expect(testDeck.RiffleShuffle).toHaveBeenCalledTimes(0);
      expect(testDeck.cards).toEqual(originalOrder);
    });
  });

  describe('RiffleShuffle()', () => {
    beforeEach(() => {
      testDeck.Create();
    });
    // assumes deckSize > 1 and probability of shuffling having no effect is low
    test('Changes card order', () => {
      const originalOrder = testDeck.cards.slice(0, testDeck.cards.length);
      testDeck.RiffleShuffle();
      expect(testDeck.cards).not.toEqual(originalOrder);
    });

    test('Is \'random\'', () => {
      function getRiffleShuffleResults() {
        testDeck.RiffleShuffle();
        return testDeck.shuffleOrder.slice(0, testDeck.shuffleOrder.length);
      }
      expect(getRiffleShuffleResults()).not.toEqual(getRiffleShuffleResults());
    });

    test('Sets shuffleOrder', () => {
      expect(testDeck.shuffleOrder.length).toEqual(0);
      testDeck.RiffleShuffle();
      expect(testDeck.shuffleOrder.length).toEqual(testDeck.cards.length);
    });
  });

  describe('Deal()', () => {
    const players = [];
    beforeEach(() => {
      for (let i = 0; i < testData.numPlayers; i += 1) {
        players.push(new Player(`Player ${i}`));
      }
      testDeck.Create();
    });

    test('Distributes cards to all players', () => {
      players.forEach((p) => {
        expect(p.hand.length).toEqual(0);
      });
      testDeck.Deal(players);
      players.forEach((p) => {
        expect(p.hand.length).toBeGreaterThan(0);
      });
    });

    test('Distributes all cards in the deck', () => {
      expect(testDeck.cards.length).toBeGreaterThan(0);
      testDeck.Deal(players);
      expect(testDeck.cards.length).toEqual(0);
    });
  });

  describe('ShowContents()', () => {
    beforeEach(() => {
      console.log = jest.fn();
    });

    test('Displays icon of each card in deck', () => {
      testDeck.Create();
      testDeck.ShowContents();
      testDeck.cards.forEach((card) => {
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(card.icon));
      });
    });

    test('Displays nothing if deck is empty', () => {
      testDeck.ShowContents();
      expect(console.log).toHaveBeenCalledWith('\n');
    });
  });

  describe('SetShuffleOrder()', () => {
    test('Order size matches input value', () => {
      expect(testDeck.shuffleOrder.length).toEqual(0);
      testDeck.SetShuffleOrder(testData.numCards);
      expect(testDeck.shuffleOrder.length).toEqual(testData.numCards);
    });

    test('Contains only \'right\' and \'left\' values', () => {
      testDeck.SetShuffleOrder(testData.numCards);
      expect(testDeck.shuffleOrder.every(x => x === 'right' || x === 'left')).toBeTruthy();
    });

    test('Order is \'random\'', () => {
      function getNewShuffleOrder() {
        testDeck.SetShuffleOrder(testData.numCards);
        return testDeck.shuffleOrder.slice(0, testDeck.shuffleOrder.length);
      }
      expect(getNewShuffleOrder()).not.toEqual(getNewShuffleOrder());
    });
  });

  describe('getDeckSize()', () => {
    test('Returns current size of deck', () => {
      testDeck.Create();
      const expectedSize = testDeck.cards.length;
      expect(testDeck.getDeckSize()).toEqual(expectedSize);
    });
  });
});
