import React, { Component } from 'react';
import './App.css';

class EndGame extends Component {
    
  render() {
    
    let display = "none";
    if (this.props.winner)
      display = "";
  
    let winnerText;
    if (this.props.winner === 'draw')  
      winnerText = "Draw";
    else 
      winnerText = "Player " + this.props.winner + " win"; 
      
    return (
      <div style={{display}} className={'endgame'}>
      <p className={'winner'}>{winnerText}</p>
      <button className={'newgame'} onClick={this.props.onClick}>Start new game</button>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    let board = Array(9).fill('');

    this.state = {
      board,
      user: 'X',
      bot: 'O',
      turn: 'X',
      winner: undefined
    }

    this.onCellClick = this.onCellClick.bind(this);
    this.doBotMove = this.doBotMove.bind(this);
    this.doMove = this.doMove.bind(this);
    this.startNewGame = this.startNewGame.bind(this);

  }

  startNewGame() {

    let board = Array(9).fill('');

    this.setState({
      board,
      user: 'X',
      bot: 'O',
      turn: 'X',
      winner: undefined
    });

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

    if (board.indexOf('') === -1) 
      return 'draw';
    else    
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
    if (winner)
      this.setState({winner});
    ;
  }


  async onCellClick(i) {

    if (this.state.turn !== this.state.user) return;
    
    let value = this.state.board[i];
    if (value !== '') return;

    let winner = await this.doMove(i, this.state.user);
    if (!winner)
      setTimeout(() => this.doBotMove(), 300);
    else
      this.setState({winner});
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

    let endGame = "";
    if (this.state.winner) 
      endGame = <EndGame winner={this.state.winner} onClick={this.startNewGame}/>;

    return (
      <div className="App">
        <div className="board">
          {cells}
        </div>
        {endGame}
      </div>
    );
  }
}

export default App;
