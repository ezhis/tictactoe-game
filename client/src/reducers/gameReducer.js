import { ADD_SYMBOL, START_AGAIN, API_URL, LOGS_EVENT } from '../actions/actions';

export const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  draw: null,
  logs: [],
  url: null, 
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SYMBOL:
      const { winner, draw, squares } = action;
      const { xIsNext } = state;    

      return {
        ...state,
        squares,
        xIsNext: !xIsNext,
        winner, 
        draw
      }

    case START_AGAIN:
      return {
        ...initialState,
        logs: state.logs,
        url: state.url,
      };

    case API_URL:
      return {
        ...state,
        url: action.payload,
      }; 

    case LOGS_EVENT: {
      const logs = state.logs.slice();
      logs.unshift(action.payload);
      return {
        ...state,
        logs,
      }
    }  

    default:
      return state;
  }
};