import React from 'react';
import './index.css';
import Board from './board'
import CalculateWinner from './CalculateWinner';
import XODataservice from './xo.service';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        history: [{
            squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
            squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    setplayer(i) {
        this.setState({
            player : i 
        });
    }

    buttonplayer(){
        if(this.state.player==null){
        return(
            <div>
            <button onClick={() => this.setplayer(true)} >X</button> <button onClick={() => this.setplayer(false)} >O</button>
            </div>
        );
        }else{
            return(
                <div>
                <label>You are "{this.state.player ? "X" : "O"}" player</label>
                </div>
            );
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

      
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
        
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <label>SELECT PLAYER</label>
                <br></br>
                {this.buttonplayer()}
                <br></br>
            
            <div className="game">
                <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}    
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                </div>
            </div>
            </div>
        );
    }
}

export default Game;