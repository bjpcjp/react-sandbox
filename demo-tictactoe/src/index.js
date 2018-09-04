import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//class Square extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = { value: null, };
//  }

//  render() {
//
    /***
    Since the Square components no longer maintain state, they receive their values 
    from the Board component and tell the Board when they’re clicked. In React terms, 
    Squares are now _controlled_ components. The Board has full control over them.
    ***/

//    return (
//      <button 
//        className="square" 
//        onClick={() => this.props.onClick()}>
//        {this.props.value}
//      </button>
//    );
//  }
//}

/***
We’ll now change the Square to be a FUNCTIONAL COMPONENT.
In React, functional components are a simpler way to write components that 
only contain a render method and don’t have their own state. 
Instead of defining a class which extends React.Component, 
we can write a function that takes props as input 
and returns what should be rendered. 

Functional components are less tedious to write than classes, 
and many components can be expressed this way.

Replace the Square class with this function:
***/

function Square(props) {
  return(
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>)
}

/***
To collect data from multiple children, or to let two child components communicate 
with each other, declare a shared state in their parent component. The parent can 
pass the state down by using props; this keeps the children in sync with each other 
and with the parent component.
***/

class Board extends React.Component {

  // lifting state into a parent component, step 1: (part of refactoring.)
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null),
    xIsNext: true, // set 1st move to be 'X' by default.
     };
  }

  /***
  Ignore clicks if game is already won, or Square is already filled.
  ***/

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) { 
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext, // toggle
    })
  }

  // modify Board to tell each Square about its current value.
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        // pass function from Board to Square, to maintain Board's state's privacy.
        onClick={() => this.handleClick(i)} />
    );
  }

  render() {
    //const status = 'Next player: X';
    //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner; 
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}