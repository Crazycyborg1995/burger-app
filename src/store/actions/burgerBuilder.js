import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = name => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name
  };
};

export const removeIngredients = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchFailed = () => {
  return {
    type: actionTypes.FETCH_FAILED
  };
};

export const initIngredients = () => {
  // async due to thunk
  return dispatch => {
    axios
      .get('https://burger-app-950d2.firebaseio.com/ingredients.json') //.json is a must for firebase
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(fetchFailed());
      });
  };
};
