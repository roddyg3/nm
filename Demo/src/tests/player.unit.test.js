const testData = require('./testData');
const Player = require('./../components/player');

describe('Player Unit Tests', () => {
  let testPlayer = {};
  const playerName = 'Player 1';
  const [expected] = testData.sets.filter(t => t.name === 'PlayingCard');

  beforeEach(() => {
    testPlayer = new Player(playerName);
  });

  describe('constructor()', () => {
    test('Passed name is stored', () => {
      expect(testPlayer.name).toEqual(playerName);
    });

    test('Hand is empty by default', () => {
      expect(testPlayer.hand.length).toEqual(0);
    });
  });

  describe('AddToHand()', () => {
    test('Adds card to hand', () => {
      testPlayer.AddToHand(expected.model);
      expect(testPlayer.hand.length).toEqual(1);
      expect(testPlayer.hand).toContain(expected.model);
    });
  });
});
