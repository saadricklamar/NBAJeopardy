import Player from './Player.js';
import domUpdates from './domUpdates.js';

class Game {
  constructor() {
    this.players = [];
  }

  updateName(names) {
    const players = names.map(name => {
      let newPlayer = new Player(name);
      return newPlayer;
    })
    this.players = players;
    domUpdates.updateNames(this.players);
  }
    // const player = new Player;
    // console.log(names);
    // const players = names.map(name => {
      // let newplayer = new Player(name);
      // return newPlayer;
    // })
    // names.map
    // domUpdates.updateNames();
    // this.players = players;
    // domUpdates.renderNames(this.players);
  // }

  generateRandomNum() {
    //generate random numbner
    //pull it
    //then take it out of array
  }
}

export default Game;