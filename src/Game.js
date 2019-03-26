import Player from './Player.js';
import domUpdates from './domUpdates.js';
import data from './data-set.js';
import Round from './Round.js';

class Game {
  constructor() {
    this.players = [];
    this.clues = [];
    this.round = {};
    // this.categories = [];
    this.categoryData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //[Object.values(data.categories)]
    this.playerTurn = 0;
  }

  createPlayers(names) {
    const players = names.map(name => {
      let newPlayer = new Player(name);
      return newPlayer;
    })
    this.players = players;
    domUpdates.updateNames(this.players);
  }

  startGame() {
    this.clues = this.shuffle(data.clues);
    this.categoryData = this.shuffle(this.categoryData);
    this.createRound();
  }
 
  createRound() {
    const round = new Round(this.categoryData.splice(0, 4), this.clues);
    round.displayCategories();
    this.round = round;
    this.createDailyDouble();
  }

  createDailyDouble() {
    let randomDailyDoubleClue = Math.floor(Math.random() * (16 - 1) + 1);
    this.round.dailyDoubleClue = randomDailyDoubleClue
    // if (this.round.cluesRemaining === randomDailyDoubleClue) {
      // console.log('daily double!')
    }

  shuffle(clues) {
    return clues.sort(() => 0.5 - Math.random());
  }

  changePlayerTurn() {
    this.playerTurn === 2 ? this.playerTurn = 0 : this.playerTurn++;
  }

  repopulateCategoryValues() {
    domUpdates.newCategoryValues();
  }

}

export default Game;