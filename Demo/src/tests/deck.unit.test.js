const Deck = require('./../components/deck');

describe('Deck Unit Tests', () => {
  let testDeck = new Deck();
  const expectedSuits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
  const expectedFaceValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

  test('All suits are defined in the deck', () => {
    testDeck = new Deck();
    expect(testDeck.suits.sort()).toEqual(expectedSuits.sort());
  });

  test('All face values are defined in the deck', () => {
    testDeck = new Deck();
    expect(testDeck.values.sort()).toEqual(expectedFaceValues.sort());
  });

  test('Creating a deck adds cards to it', () => {
    testDeck = new Deck();
    expect(testDeck.cards.length).toBeLessThanOrEqual(0);
    testDeck.CreateDeck();
    expect(testDeck.cards.length).toBeGreaterThan(0);
    expect(testDeck.cards).toContainEqual({ value: 'Ace', suit: 'Spades' });
    // test iterating through all combinations?
  });
});
