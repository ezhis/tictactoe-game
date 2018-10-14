import React from 'react';
import { connect } from 'react-redux';

import Square from './Square';
import { startAgain } from '../actions/actions';

class Board extends React.Component {

  render() {
    const { winner, draw, xIsNext, startAgain } = this.props;
    let status;
    if (winner) {
      status = `Winner is player: ${winner}`;
    } else if (draw) {
      status = 'Draw';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div>
        <div className='status'>{status}</div>
        <div className='board'>
          <div className="board-row">
            <Square id={0}/>
            <Square id={1}/>
            <Square id={2}/>
          </div>
          <div className="board-row">
            <Square id={3}/>
            <Square id={4}/>
            <Square id={5}/>
          </div>
          <div className="board-row">
            <Square id={6}/>
            <Square id={7}/>
            <Square id={8}/>  
          </div>
        </div>
        <div className="gameControls">
        { !(winner || draw) || <button className='reload' onClick={startAgain}>Restart</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({squares, xIsNext, winner, draw}) => {
  return { squares, xIsNext, winner, draw }
}

export default connect(mapStateToProps,  { startAgain })(Board)
