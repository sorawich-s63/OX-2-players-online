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
            stepnumber: this.state.stepNumber + 1,
            xisnext: next
        }
        XODataService.update(data);
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

    checkData(newStep,newhistory){
        console.log(this.state.stepNumber);
        console.log(newStep);

        const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]); //check duplicate array
        
        if((this.state.stepNumber < newStep) || (equals(this.state.squares, newhistory))){
            return true
        }else{
            return false
        }
        
    }

    checkRestart(newStep){
        if(this.state.stepNumber > newStep){
            return true
        }else{
            return false
        }
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
                    <button onClick={() => this.setplayer(true)} >X</button> 
                    <button onClick={() => this.setplayer(false)} >O</button>
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

    restart() {
        this.setState({
            squares: Array(9).fill(null),
            stepNumber: 0,
            xIsNext: true 
        });
        var data = {
            history: JSON.stringify(Array(9).fill(null)),
            stepnumber: 0,
            xisnext: true
        }
        XODataService.update(data);
    }

    
    retrieve() {
        // console.log("hi")
        XODataService.getAll()
            .then(response => {
                const alldata = response.data
                if(this.checkData(parseInt(alldata.stepnumber)),JSON.parse(alldata.history)){
                    console.log("setState");
                    this.setState({
                        squares: JSON.parse(alldata.history),
                        stepNumber: parseInt(alldata.stepnumber),
                        xIsNext: alldata.xisnext
                    });
                }else if(this.checkRestart(alldata.stepnumber)){
                    console.log("Restart!");
                    this.setState({
                        squares: Array(9).fill(null),
                        stepNumber: 0,
                        xIsNext: true 
                    });
                }else{
                    console.log("not setState");
                }
            })

            
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const winner = CalculateWinner(this.state.squares);

        // setTimeout(() => {this.retrieve(); }, 1500);
        this.retrieve();
        
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
                        <br></br>
                        <div>
                            <button onClick={() => this.restart()} > Restart </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;