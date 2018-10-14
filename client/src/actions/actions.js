import api from '../api/api';

export const LOGS_EVENT  = 'LOGS_EVENT';
export const ADD_SYMBOL = 'ADD_SYMBOL';
export const START_AGAIN = 'START_AGAIN';
export const API_URL = 'API_URL';

export const EVENT_PLAYER_MOVE = 'eventPlayerMove';
export const EVENT_PLAYER_WINS = 'eventPlayerWins';
export const EVENT_DRAW = 'eventDraw';
export const EVENT_START_AGAIN = 'evenStartAgain';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] };
    }
  }
  const empty = squares.find(s => !s);
  return {
    winner: null,
    draw:  !(empty === null),
  }
}

const getCordinates = (id) => ({
  x: (id % 3),
  y: Math.floor(id / 3),
})

export const newLogEvent = (data) => {
  const event = JSON.parse(data);
  return {
    type: LOGS_EVENT,
    payload: { ...event  },
  }; 
}

export const addSymbol = (id) => {
  return async (dispacth, getState) => {
    const { squares, xIsNext, winner } = getState();
    if (winner) return;
    
    const squaresNew = squares.slice();
    const symbol = xIsNext ? 'X' : 'O';
    squaresNew[id] = symbol;

    const results = calculateWinner(squaresNew);
    
    dispacth ({
      type: ADD_SYMBOL,
      squares: squaresNew,
      winner: results.winner, 
      draw: results.draw
    });

    api.logAEvent(EVENT_PLAYER_MOVE, {
      player: symbol,
      cordinates: getCordinates(id),
    });

    if (results.winner) {
      api.logAEvent(EVENT_PLAYER_WINS, {
        player: symbol,
      });
    } else  if (results.draw) {
      api.logAEvent(EVENT_DRAW);
    }
  }
};

export const startGame = () => {
  return async () => {
    await api.startAgain();
  };
};

export const getApiUrl = () => {
  return async (dispacth) => {
    const apiUrl = await api.getApiUrl();
    
    dispacth ({
      type: API_URL,
      payload: apiUrl,
    });
  };
};

export const startAgain = () => {
  return (dispacth) => {
    api.logAEvent(EVENT_START_AGAIN);
    dispacth ({
      type: START_AGAIN
    });
  };
};