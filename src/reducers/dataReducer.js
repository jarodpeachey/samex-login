import {
  GET_DATA,
} from '../actions/types';

const initialState = {
  data: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: state.data,
      };
    default:
      return state;
  }
};

export default dataReducer;
