const readlineSync = require('readline-sync');
const console = require('console');
const PlayingCardClient = require('./../client/playingCard.client');
const testData = require('./testData');

describe('PlayingCardClient Unit Tests', () => {
  let cardClient = {};

  beforeEach(() => {
    cardClient = new PlayingCardClient();
  });

  describe('SetUpGame()', () => {
    test('Calls all expected methods', () => {
      cardClient.SetUpDeck = jest.fn();
      cardClient.GetPlayerInput = jest.fn();
      cardClient.CheckForInvalidPlayers = jest.fn();
      cardClient.CreatePlayers = jest.fn();
      cardClient.ShuffleAndDeal = jest.fn();
      cardClient.ShowPlayersHands = jest.fn();
      cardClient.SetUpGame();
      expect(cardClient.GetPlayerInput).toHaveBeenCalled();
      expect(cardClient.CheckForInvalidPlayers).toHaveBeenCalled();
      expect(cardClient.SetUpDeck).toHaveBeenCalled();
      expect(cardClient.CreatePlayers).toHaveBeenCalledWith(cardClient.numPlayers);
      expect(cardClient.ShuffleAndDeal)
        .toHaveBeenCalledWith(cardClient.shuffleCount, cardClient.players);
      expect(cardClient.ShowPlayersHands).toHaveBeenCalledWith();
    });
  });

  describe('GetPlayerInput()', () => {
    beforeEach(() => {
      readlineSync.questionInt = jest.fn().mockReturnValue(testData.numPlayers);
    });

    test('Prompts user for number of players', () => {
      cardClient.GetPlayerInput();
      expect(readlineSync.questionInt).toHaveBeenCalledWith('How many players? ');
    });

    test('Confirms input received', () => {
      console.log = jest.fn();
      cardClient.GetPlayerInput();
      expect(console.log).toHaveBeenCalledWith(`${testData.numPlayers} player(s) selected\n`);
    });

    test('Stores input in numPlayers', () => {
      cardClient.GetPlayerInput();
      expect(readlineSync.questionInt).toHaveLastReturnedWith(testData.numPlayers);
      expect(cardClient.numPlayers).toEqual(testData.numPlayers);
    });
  });

  describe('CreatePlayers()', () => {
    test('Creates specified number of Players', () => {
      cardClient.CreatePlayers(testData.numPlayers);
      expect(cardClient.players.length).toEqual(testData.numPlayers);
    });

    test('Does nothing if number < 1', () => {
      cardClient.CreatePlayers(0);
      expect(cardClient.players).toEqual([]);
    });
  });

  describe('SetUpDeck()', () => {
    test('Creates a new deck', () => {
      expect(cardClient.playingDeck.cards.length).toEqual(0);
      cardClient.SetUpDeck();
      expect(cardClient.playingDeck.cards.length).toBeGreaterThan(0);
    });

    test('Displays newly created deck', () => {
      console.log = jest.fn();
      cardClient.SetUpDeck();
      expect(console.log).toHaveBeenCalledWith('The following deck was created:');
      expect(console.log).toHaveBeenLastCalledWith(
        expect.stringContaining(cardClient.playingDeck.cards[0].icon),
      );
    });
  });

  describe('ShuffleAndDeal()', () => {
    beforeEach(() => {
      cardClient.SetUpDeck();
      cardClient.CreatePlayers(testData.numPlayers);
    });

    test('Shuffles the deck the specified number of times', () => {
      cardClient.playingDeck.Shuffle = jest.fn();
      cardClient.ShuffleAndDeal(3, cardClient.players);
      expect(cardClient.playingDeck.Shuffle).toHaveBeenCalledWith(3);
    });

    test('Displays shuffled results', () => {
      console.log = jest.fn();
      const expectedCard = cardClient.playingDeck.cards[0].icon;
      cardClient.ShuffleAndDeal(1, cardClient.players);
      expect(console.log).toHaveBeenCalledWith('Shuffle results:');
      expect(console.log).toHaveBeenLastCalledWith(
        expect.stringContaining(expectedCard),
      );
    });

    test('Deals to specified players', () => {
      cardClient.playingDeck.Deal = jest.fn();
      cardClient.ShuffleAndDeal(1, cardClient.players);
      expect(cardClient.playingDeck.Deal).toHaveBeenCalledWith(cardClient.players);
    });
  });

  describe('CheckForInvalidPlayers()', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });

    test('Returns an error if players > number of cards', () => {
      cardClient.SetUpDeck();
      readlineSync.questionInt = jest.fn().mockReturnValue(cardClient.playingDeck.length + 1);
      cardClient.GetPlayerInput();
      cardClient.CheckForInvalidPlayers();
      expect(console.error).toHaveBeenLastCalledWith('ERROR: Invalid value for number of players');
    });

    test('Returns an error if players < 1', () => {
      cardClient.CheckForInvalidPlayers();
      expect(console.error).toHaveBeenCalledWith('ERROR: Game requires at least one player!');
    });

    test('Returns an error if player input is non-integer', () => {
      cardClient.numPlayers = 'Five';
      cardClient.CheckForInvalidPlayers();
      expect(console.error).toHaveBeenCalledWith('ERROR: Invalid value for number of players');
    });
  });

  describe('ShowPlayersHands()', () => {
    beforeEach(() => {
      console.log = jest.fn();
    });

    test('Displays players\' hands', () => {
      cardClient.SetUpDeck();
      const expectedCard = cardClient.playingDeck.cards[0].icon;
      cardClient.CreatePlayers(testData.numPlayers);
      cardClient.ShuffleAndDeal(1, cardClient.players);
      cardClient.ShowPlayersHands();
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(expectedCard));
      for (let i = 0; i < testData.numPlayers; i += 1) {
        expect(console.log).toHaveBeenCalledWith(
          expect.stringContaining(cardClient.players[i].name),
        );
      }
    });

    test('Displays correct message if hand is empty', () => {
      cardClient.CreatePlayers(1);
      cardClient.ShowPlayersHands();
      expect(console.log).toHaveBeenLastCalledWith('Player 1\'s hand is empty!');
    });
  });
});
