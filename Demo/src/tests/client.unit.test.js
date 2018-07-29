const readlineSync = require('readline-sync');
const console = require('console');
const PlayingCardClient = require('./../client/playingCard.client');

describe('PlayingCardClient Unit Tests', () => {
  test('GetPlayerInput() prompts user for number of players', () => {
    const cardClient = new PlayingCardClient();
    readlineSync.questionInt = jest.fn().mockReturnValue(4);
    cardClient.GetPlayerInput();
    expect(readlineSync.questionInt).toHaveBeenCalledWith('How many players? ');
  });

  test('GetPlayerInput() confirms input received', () => {
    const cardClient = new PlayingCardClient();
    readlineSync.questionInt = jest.fn().mockReturnValue(4);
    console.log = jest.fn();
    cardClient.GetPlayerInput();
    expect(console.log).toHaveBeenCalledWith('4 player(s) selected\n');
  });

  test('GetPlayerInput() stores input in numPlayers', () => {
    const cardClient = new PlayingCardClient();
    readlineSync.questionInt = jest.fn().mockReturnValue(4);
    cardClient.GetPlayerInput();
    expect(readlineSync.questionInt).toHaveLastReturnedWith(4);
    expect(cardClient.numPlayers).toEqual(4);
  });

  test('CheckForInvalidPlayers() returns an error if players > number of cards', () => {
    const cardClient = new PlayingCardClient();
    cardClient.playingDeck.Create();
    readlineSync.questionInt = jest.fn().mockReturnValue(cardClient.playingDeck.length + 1);
    cardClient.GetPlayerInput();
    console.error = jest.fn();
    cardClient.CheckForInvalidPlayers();
    expect(console.error).toHaveBeenCalledWith();
  });

  test('CheckForInvalidPlayers() returns an error if players < 1', () => {
    const cardClient = new PlayingCardClient();
    console.error = jest.fn();
    cardClient.SetUpGame();
    expect(console.error).toHaveBeenCalledWith('ERROR: Game requires at least one player!');
  });

  test('CheckForInvalidPlayers() returns an error if player input is non-integer', () => {
    const cardClient = new PlayingCardClient();
    readlineSync.questionInt = jest.fn().mockRejectedValue('ABCD');
    cardClient.GetPlayerInput();
    expect(readlineSync.questionInt).toHaveBeenLastCalledWith();
  });

  test('Verify players have all the cards', () => {
    const cardClient = new PlayingCardClient();
    readlineSync.questionInt = jest.fn().mockReturnValue(4);
    cardClient.SetUpGame();
    let totalCards = 0;
    cardClient.players.forEach((player) => {
      console.log(`player has ${player.hand.length} cards`);
      totalCards += player.hand.length;
    });
    expect(totalCards).toEqual(52);
  });
});
