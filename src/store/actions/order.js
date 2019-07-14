import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerPurchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.BURGER_PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};
export const burgerPurchaseFail = error => {
  return {
    type: actionTypes.BURGER_PURCHASE_FAIL,
    error: error
  };
};

export const burgerPurchaseStart = () => {
  return {
    type: actionTypes.BURGER_PURCHASE_START
  };
};

// Async using thunk
export const burgerPurchase = (orderData, token) => {
  return dispatch => {
    // for loading spinner
    dispatch(burgerPurchaseStart());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then(response => {
        // response.data.name contains the id from firebase
        dispatch(burgerPurchaseSuccess(response.data.name, orderData));
      })
      .catch(err => {
        dispatch(burgerPurchaseFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrderSuccess = order => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    order: order
  };
};

export const fetchOrderFail = err => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL
  };
};

// Async fetching
export const fetchOrder = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart);
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/orders.json' + queryParams)
      .then(res => {
        let fetchedOrders = [];
        // res.data returns order as an object with key from firebase
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key }); // add additional prop id as we dont want to lose key
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFail());
      });
  };
};
