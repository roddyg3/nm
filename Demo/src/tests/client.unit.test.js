const readlineSync = require('readline-sync');
const console = require('console');
const PlayingCardClient = require('./../client/playingCard.client');

describe('PlayingCardClient Unit Tests', () => {
  const cardClient = new PlayingCardClient();
  readlineSync.question = jest.fn().mockReturnValue('4');
  console.log = jest.fn();

  test('User is prompted for number of players', () => {
    cardClient.GetUserInput();
    expect(readlineSync.question).toHaveBeenCalledWith('How many players? ');
  });

  test('User is shown input received', () => {
    expect(console.log).toHaveBeenCalledWith('4 player(s) selected\n');
  });

  test('User input for numPlayers is stored', () => {
    expect(readlineSync.question).toHaveLastReturnedWith('4');
    expect(cardClient.numPlayers).toEqual('4');
  });
});
