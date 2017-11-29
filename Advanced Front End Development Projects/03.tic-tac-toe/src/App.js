import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    let board = Array(9).fill('');

    this.state = {
      board,
      user: 'X',
      bot: 'O'
    }

    this.onCellClick = this.onCellClick.bind(this);
    this.doBotMove = this.doBotMove.bind(this);
    this.doMove = this.doMove.bind(this);

  }

  async doMove(i, value) {

    return new Promise((resolve) => {
      
      let board = this.state.board.slice();
      board[i] = value;

      this.setState({ board }, resolve);
    })
  }

  doBotMove() {

    console.log(this.state.board);
    let move = undefined;
    for (let i = 0; i < 9; i++)
      if (this.state.board[i] === '') {
        move = i;
        break;
      }

    if (move === undefined) return;
    setTimeout(() => {this.doMove(move, this.state.bot)}, 300);
  }


  async onCellClick(i) {

    let value = this.state.board[i];
    if (value !== '') return;

    await this.doMove(i, this.state.user);
    this.doBotMove();

  }

  render() {

    let cells = [];

    for (let i = 0; i < 9; i++) {

      let value = this.state.board[i];
      let color = value === 'X' ? 'blue' : 'red';

      cells.push(
        <div key={i} onClick={() => this.onCellClick(i)} className="cell" style={{ color }}>
          {value}
        </div>
      );
    }

    return (
      <div className="App">
        <div className="board">
          {cells}
        </div>
      </div>
    );
  }
}

export default App;
