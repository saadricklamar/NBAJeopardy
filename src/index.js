// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file

// An example of how you import jQuery into a JS file if you use jQuery in the file
import $ from 'jquery';

// An example of how you tell webpack to apply a CSS file
import './css/base.css';
import data from './data-set.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Game from './Game';
// import Clue from './Clue';

const startGameBtn = $('#start-game-btn');
const gameBoard = $('.game-board');


// $startGameBtn.on('click', () => {
//   // game.updateName();
//   console.log('hello');
// }

startGameBtn.click(function (e) {
  e.preventDefault();
  const names = [$('#player-one-input').val(), $('#player-two-input').val(), $('#player-three-input').val()]
  const game = new Game;
  // const clue = new Clue;
  game.createPlayers(names);
  game.startRound();
  // clue.getClue(data);
  // game.udpateCategories();
})

gameBoard.click(function (e) {
  e.preventDefault();
  let btnId = event.target.id;
  const game = new Game;
  game.showClue(btnId);
  console.log(btnId)

  //create a variable and put the value of the box clicked

})