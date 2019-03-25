import $ from 'jquery';
import data from './data-set.js';
import Player from './Player.js';
// import Game from './Game.js';

export default {
  updateNames(names) {
    $('#player-one-name').text(names[0].name).show();
    $('#player-two-name').text(names[1].name).show();
    $('#player-three-name').text(names[2].name).show();
    $('#player-one-input').hide(500);
    $('#player-two-input').hide(500);
    $('#player-three-input').hide(500);
  },

  notifyPlayerOneTurn(names, game) {
    if (game.playerTurn === 0) {
      $('#player-one-name').attr('style', 'color:red;');
      $('#player-three-name').removeAttr('style', 'color:red;');
    } 
  },

  notifyNextTurn(game) {
    if (game.playerTurn === 0) {
      $('#player-one-name').attr('style', 'color:red;');
      $('#player-three-name').removeAttr('style', 'color:red;');
    } 
    if (game.playerTurn === 1) {
      $('#player-two-name').attr('style', 'color:red;');
      $('#player-one-name').removeAttr('style', 'color:red;');
    }
    if (game.playerTurn === 2) {
      $('#player-three-name').attr('style', 'color:red;');
      $('#player-one-name').removeAttr('style', 'color:red;');
      $('#player-two-name').removeAttr('style', 'color:red;');
    }
  },

  displayCategories(categories) {
    const categoryTitles = [ 'US History', 'Life Sciences', 
      'Public Health', 'Education Jargon',
      'Name That Board Game', 'American Literature', 
      'Biographies', 'American Cities', 'Food', 'Cable TV' ];
    categories.forEach((category, index) => {
      $(`.cat-title-${index}`).text(`${categoryTitles[category - 1]}`);
      $(`.col.${index}`).attr('id', category);
    });
  },


  showClue(clue, event) {
    $('.question-prompt').show();
    $('.result-prompt').hide();
    $('.question').text(clue.question);
    if($(event.target).text('')) {
      $(event.target).unbind('click');
    }
  },
    
  answerQuestion(game) {
    let questionText = $(".question");
    let answerText = $('#question-input');
    let currentPlayer = game.players[game.playerTurn];
    game.round.cluesRemaining--;
    if (game.round.cluesRemaining === 0) {
      game.createRound();
    }
    console.log(game.round.cluesRemaining);
    let result = data.clues.reduce((acc, currentClue) => {
      if (questionText.text() === currentClue.question) {
        acc += currentClue.answer;
      }
      return acc;
    }, '');
    if (result.toLowerCase() === answerText.val().toLowerCase()) {
      $('.question-prompt').hide();
      $('.result-prompt').show();
      $('.result').text('Correct Answer');
      currentPlayer.increaseScore(result);
      $(`#player-${game.playerTurn}-points`).text(currentPlayer.score);
    } else {
      $('.question-prompt').hide();
      $('.result-prompt').show();
      $('.result').text('Incorrect Answer');
      currentPlayer.decreaseScore(result);
      $(`#player-${game.playerTurn}-points`).text(currentPlayer.score);
      game.changePlayerTurn();
    }
  },

  // changeScore()
  
}