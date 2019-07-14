import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };

    case actionTypes.BURGER_PURCHASE_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.BURGER_PURCHASE_SUCCESS:
      // merge orderId and orderData
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder), // concat returns new array and doesnt mutate org state
        loading: false,
        purchased: true
      };

    case actionTypes.BURGER_PURCHASE_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.order
      };
    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state; // if you doesnt pass state the program will break as state will be undefined
  }
};

export default reducer;
