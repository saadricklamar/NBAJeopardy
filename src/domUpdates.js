import $ from 'jquery';
import data from './data-set.js';
import Player from './Player.js';
import DailyDouble from './DailyDouble.js';
import Round from './Round.js';
import Game from './Game.js';


export default {
  updateNames(names) {
    $('#player-one-name').text(names[0].name).show();
    $('#player-two-name').text(names[1].name).show();
    $('#player-three-name').text(names[2].name).show();
    $('#player-one-input').hide(500);
    $('#player-two-input').hide(500);
    $('#player-three-input').hide(500);
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

  notifyPlayerOneTurn(game) {
    if (game.playerTurn === 0) {
      $('#player-one-name').attr('style', 'color:red;');
      $('#player-three-name').removeAttr('style', 'color:red;');
    } 
  },

  showClue(game, clue, event) {
    game.round.cluesRemaining--;
    console.log(game.round.cluesRemaining);
    console.log(game.round.dailyDoubleClue);
    if (game.round.cluesRemaining === game.round.dailyDoubleClue) {
      this.dailyDouble(game, clue);
    } else {
      $('.question-prompt').show();
      $('.result-prompt').hide();
      $('.question').text(clue.question);
      $(event.target).text('');
      $('.game-board').hide();
    }
  },

  dailyDouble(game, clue) {
    $('.style-daily-double').show();
    let wagerAmount;
    let dailyDouble;
    $('#daily-double').keyup(function () {
      wagerAmount = $('#daily-double').val();
    });
    $('.daily-double-btn').click(function (e) {
      e.preventDefault();
      dailyDouble = new DailyDouble(clue.question, clue.answer, clue.pointValue);
      dailyDouble.updatePointValue(wagerAmount);
    });
    // $('.question-prompt').show();
    // $('.result-prompt').hide();
    // $('.question').text(clue.question); 
  },

  answerQuestion(game) {
    let currentPlayer = game.players[game.playerTurn];
    if (game.round.cluesRemaining === 0) {
      this.newCategoryValues();
      game.createRound();
    }
    let answerMatch = data.clues.reduce((acc, currentClue) => {
      if ($(".question").text() === currentClue.question) {
        acc += currentClue.answer;
      }
      return acc;
    }, '');
    if (answerMatch.toLowerCase() === $('#question-input').val().toLowerCase()) {
      this.rightAnswer(currentPlayer, answerMatch, game);
    } else {
      this.wrongAnswer(currentPlayer, answerMatch, game);
    }
  },

  newCategoryValues() {
    let roundTwoValues = [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4];
    let result = roundTwoValues.map(number => {
        return number * 200;
      })
    $('h3').each(function(i) {
      $(this).text(result[i]);
    })
  },

  rightAnswer(currentPlayer, answerMatch, game) {
     $('.game-board').show();
     $('.question-prompt').hide();
     $('.result-prompt').show(500);
     $('.result').text('Correct Answer');
     currentPlayer.increaseScore(answerMatch);
     $(`#player-${game.playerTurn}-points`).text(currentPlayer.score);
     $('.result-prompt').hide(5000);
  },

  wrongAnswer(currentPlayer, answerMatch, game) {
    $('.game-board').show();
    $('.question-prompt').hide();
    $('.result-prompt').show(500);
    $('.result').text('Incorrect Answer.');
    currentPlayer.decreaseScore(answerMatch);
    $(`#player-${game.playerTurn}-points`).text(currentPlayer.score);
    game.changePlayerTurn();
    $('.result-prompt').hide(5000);
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
  }

}