import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    let board = Array(9).fill('');

    this.state = {
      board,
      user: 'X',
      bot: 'O',
      turn: 'X'
    }

    this.onCellClick = this.onCellClick.bind(this);
    this.doBotMove = this.doBotMove.bind(this);
    this.doMove = this.doMove.bind(this);

  }

  checkWinner(board) {

    // rows
    for (let i=0; i<3; i++) {
      if (board[3*i] !== '' && 
          board[3*i] === board[3*i + 1] && 
          board[3*i] === board[3*i + 2]) 
          return board[3*i];
    }  
    
    // columns
    for (let i=0; i<3; i++) {
      if (board[i] !== '' && 
          board[i] === board[i + 3] && 
          board[i] === board[i + 6]) 
          return board[i];
    }  
    
    // diags
    if (board[0] !== '' && 
        board[0] === board[4] && 
        board[0] === board[8]) 
        return board[0];

    if (board[2] !== '' && 
        board[2] === board[4] && 
        board[2] === board[6]) 
        return board[2];

    return undefined;
  }

  async doMove(i, value) {

    return new Promise((resolve) => {
      
      let board = this.state.board.slice();
      board[i] = value;

      let winner = this.checkWinner(board);
      this.setState({ board }, resolve(winner));

    })
  }

  async doBotMove() {

    let move = undefined;
    for (let i = 0; i < 9; i++)
      if (this.state.board[i] === '') {
        move = i;
        break;
      }

    if (move === undefined) return;
    let winner = await this.doMove(move, this.state.bot);
    if (winner) console.log(winner);
  }


  async onCellClick(i) {

    if (this.state.turn !== this.state.user) return;
    
    let value = this.state.board[i];
    if (value !== '') return;

    let winner = await this.doMove(i, this.state.user);
    if (!winner)
      setTimeout(() => this.doBotMove(), 300);
    else
      console.log(winner);

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
