const testData = require('./testData');
const Deck = require('./../components/deck');
const PlayingCard = require('./../components/card');

describe('Deck Unit Tests', () => {
  const testDeck = new Deck();

  test('All suits are defined', () => {
    expect(testDeck.suits.sort()).toEqual(testData.expectedSuits.sort());
  });

  test('All face values are defined', () => {
    expect(testDeck.values.sort()).toEqual(testData.expectedFaceValues.sort());
  });

  test('Creating a deck adds cards to it', () => {
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

  test('Creating a deck adds all expected cards', () => {
    const expectedCards = [];
    for (let s = 0; s < testData.expectedSuits.length; s += 1) {
      for (let v = 0; v < testData.expectedFaceValues.length; v += 1) {
        expectedCards.push(
          new PlayingCard(
            testData.expectedSuits[s],
            testData.expectedFaceValues[v],
          ),
        );
      }
    }
    expect(testDeck.cards.sort()).toEqual(expectedCards.sort());
  });

  test('Created deck contains expected number of cards', () => {
    const expectedNumCards = testData.expectedSuits.length * testData.expectedFaceValues.length;
    expect(testDeck.cards.length).toEqual(expectedNumCards);
  });

  test('Shuffling a deck changes card order', () => {
    const originalOrder = testDeck.cards;
    // testDeck.Shuffle(1);
    expect(testDeck.cards).not.toEqual(originalOrder);
  });
/*
  test('Shuffle changes card order each time it occurs', () => {

  });

  test('Dealing distributes cards to all players', () => {

  });

  test('Dealing distributes all cards in the deck', () => {

  });

  test('Deal returns an error if players > number of cards', () => {

  });

  test('Deal returns an error if players < 1', () => {

  }); */
});
