import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false
};

const PRICE_LIST = { meat: 0.4, bacon: 0.6, salad: 0.2, cheese: 0.3 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ADD INGREDIENTS
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //es6, this will only overwrite the specified ingredientName
        },
        totalPrice: state.totalPrice + PRICE_LIST[action.ingredientName],
        building: true
      };

    // REMOVE INGREDIENTS
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - PRICE_LIST[action.ingredientName],
        building: true
      };

    // FETCH INGREDIENTS
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients, // this data can be structured e.g, ingredients : { salad : action.ingredients.salad, bacon : , meat ....}
        error: false,
        totalPrice: 0, // reset price when the page refresh
        building: false
      };

    // FETCH FAILED
    case actionTypes.FETCH_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
