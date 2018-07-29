const testData = require('./testData');
const Deck = require('./../components/deck');
const PlayingCard = require('./../components/card');
const Player = require('./../components/player');

describe('Deck Unit Tests', () => {
  test('All suits are defined', () => {
    const testDeck = new Deck();
    expect(testDeck.suits.sort()).toEqual(testData.expectedSuits.sort());
  });

  test('All face values are defined', () => {
    const testDeck = new Deck();
    expect(testDeck.values.sort()).toEqual(testData.expectedFaceValues.sort());
  });

  test('Creating a deck adds cards to it', () => {
    const testDeck = new Deck();
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

  test('Created deck contains expected number of cards', () => {
    const testDeck = new Deck();
    testDeck.Create();
    const expectedNumCards = testData.expectedSuits.length * testData.expectedFaceValues.length;
    expect(testDeck.cards.length).toEqual(expectedNumCards);
  });

  test('Shuffling a deck changes card order', () => {
    const testDeck = new Deck();
    testDeck.Create();
    const originalOrder = testDeck.cards.slice(0, testDeck.cards.length);
    testDeck.Shuffle(1);
    expect(testDeck.cards).not.toEqual(originalOrder);
  });

  test('Dealing distributes cards to all players', () => {
    const testDeck = new Deck();
    testDeck.Create();
    const players = [new Player('Player 1'), new Player('Player 2')];
    expect(players[0].hand.length).toEqual(0);
    expect(players[1].hand.length).toEqual(0);
    testDeck.Deal(players);
    expect(players[1].hand.length).toBeGreaterThan(0);
  });

  test('Dealing distributes all cards in the deck', () => {
    const testDeck = new Deck();
    testDeck.Create();
    const players = [new Player('Player 1')];
    expect(testDeck.cards.length).not.toEqual(0);
    testDeck.Deal(players);
    expect(testDeck.cards.length).toEqual(0);
  });
});
