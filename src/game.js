import React from 'react';
import './index.css';
import Board from './board'
import CalculateWinner from './CalculateWinner';
import XODataService from './xo.service';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            stepNumber: 0,
            xIsNext: true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    updatedb(next){
        var data = {
            history: JSON.stringify(Array(9).fill(null)),
            history: JSON.stringify(this.state.squares),
            stepnumber: this.state.stepNumber,
            xisnext: next
        }
        //console.log("click ",this.state.xIsNext)
        XODataService.update(data);
        this.retrieve()
    }

    handleClick(i) {

        if(this.state.player == this.state.xIsNext)
        {
            const step = this.state.stepNumber + 1;
            const squares = this.state.squares;
            const next = !this.state.xIsNext;
            
            if (CalculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? 'X' : 'O';

            this.setState({
                squares: squares,
                stepNumber: step,
                xIsNext: ! this.state.xIsNext
            });
            
            this.updatedb(next)
            
        }
        
    }

    setplayer(i) {
        this.setState({
            player : i 
        });
        this.retrieve();
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

    retrieve() {
        if(this.state.player == this.state.xIsNext){
        XODataService.getAll()
            .then(response => {
                const alldata = response.data
                this.setState({
                    squares: JSON.parse(alldata.history),
                    stepNumber: parseInt(alldata.stepnumber),
                    xIsNext: alldata.xisnext
                });
                console.log(this.state);
            
            })
            
            .catch(e => {
                console.log(e);
            });
        }
    }

    retrieve1() {
        XODataService.getAll()
            .then(response => {
                const alldata = response.data
                this.setState({
                    squares: JSON.parse(alldata.history),
                    stepNumber: parseInt(alldata.stepnumber),
                    xIsNext: alldata.xisnext
                });
                console.log(this.state);
            
            })
            
            .catch(e => {
                console.log(e);
            });
    }

      
    render() {
        const winner = CalculateWinner(this.state.squares);
        this.retrieve1();
        
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
                    squares={this.state.squares}
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