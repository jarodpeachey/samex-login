import {
  GET_DATA,
} from '../actions/types';

const initialState = {
  data: {},
};

// const addArrayItem = (array, newItem) => {
//   const newArray = [...array];

//   newArray.push(newItem);

//   return [...newArray];
// };

// const updateArrayItem = (array, updatedItem) => {
//   const newArray = [...array];

//   return newArray.map((item) => {
//     if (item.id !== updatedItem.id) {
//       return item;
//     }

//     return {
//       ...item,
//       ...updatedItem,
//     };
//   });
// };

// const removeArrayItem = (array, id) => {
//   const newArray = [...array];

//   return newArray.filter(item => item.id !== id);
// };

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
