import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Board from './components/Board';
import Log from './components/Log';
import { newLogEvent } from './actions/actions';


class App extends Component {

  render() {
   
    const {url} = this.props;
    if (url) {
      const eventSource = new EventSource(`${this.props.url}/events`);
      eventSource.onmessage = (e) => {
        this.props.newLogEvent(e.data);
      };
    } else  {
      return null;
    }


    return (
      <div className="App">
        <Board />
        <Log />
      </div>
    );
  }
}


const mapStateToProps = ({url}) => {
  return { url }
}

export default connect(mapStateToProps, {newLogEvent})(App)