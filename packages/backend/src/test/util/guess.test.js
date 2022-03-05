import { addGuess, getGuesses } from '../../lib/socket/utils/gameState';

describe('Guess - State', () => {
  it('Frequency Map', async () => {
    addGuess('user', 'main', 'apple');
    addGuess('user', 'main', 'apple');
    addGuess('user', 'main', 'banana');
    addGuess('user', 'othersession', 'banana');

    const state = getGuesses('main');
    console.log(state);

    expect(state).toEqual([
      { value: 'apple', frequency: 2 },
      { value: 'banana', frequency: 1 },
    ]);
  });
});
