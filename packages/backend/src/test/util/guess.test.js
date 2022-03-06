import { addGuess, getGuesses } from '../../lib/socket/utils/gameState';

describe('Guess - State', () => {
  it('Frequency Map', async () => {
    addGuess('user1', 'main', 'apple');
    addGuess('user2', 'main', 'apple');
    addGuess('user3', 'main', 'banana');
    addGuess('user4', 'othersession', 'banana');

    const state = getGuesses('main');
    console.log(state);

    expect(state).toEqual([
      { value: 'apple', frequency: 2 },
      { value: 'banana', frequency: 1 },
    ]);
  });
});
