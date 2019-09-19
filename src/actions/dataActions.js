import axios from 'axios';
import 'babel-polyfill';
import {
  GET_DATA,
} from './types';

export const getData = () => (dispatch) => {
  dispatch({
    type: GET_DATA,
  });
};
