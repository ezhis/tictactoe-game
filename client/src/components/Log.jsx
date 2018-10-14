import React from 'react';
import { connect } from 'react-redux';
import {
  EVENT_DRAW,
  EVENT_PLAYER_MOVE, 
  EVENT_PLAYER_WINS,
  EVENT_START_AGAIN,
} from '../actions/actions';

class Log extends React.Component {

  renderEntry({type, action}) {
    switch (type) {
      case EVENT_PLAYER_MOVE:
        return `Player puts ${action.player} at {x:${action.cordinates.x}, y:${action.cordinates.y}}`
      case EVENT_PLAYER_WINS:
        return `Player ${action.player} wins`
      case EVENT_DRAW:
        return `Draw`
      case EVENT_START_AGAIN:
        return `Start again`;
      default:
        return '';
    }
  }


  render() {
    const { logs } = this.props;
    if (!logs) return null;
    return (
        <div className="logs">
         {logs.map(entry => (
           <div key={entry.id}>{this.renderEntry(entry)}</div>
         ))}
        </div>
    );
  }
}

const mapStateToProps = ({logs}) => {
  return { logs }
};

export default connect(mapStateToProps)(Log)
