import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// we can use refreshToken from firebase but bcoz of security concern prefer not
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      //After 1 hour dispatching this action which will make sure the user is logged out by clearing the token and userId to null
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true //always
    };
    const API_KEY = 'AIzaSyBCYFS_W4hgRXtmx9LB3MaZGiBzSlyofzE';
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    if (!isSignUp) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    }
    axios
      .post(url, authData)
      .then(response => {
        const { idToken, localId, expiresIn } = response.data;
        const expirationTime = new Date(
          new Date().getTime() + expiresIn * 1000
        ); //convert string(1236632657) to date object
        localStorage.setItem('token', idToken);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId', localId);
        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationTime')); // converts string to Date object
      const userId = localStorage.getItem('userId');
      if (expirationTime > new Date()) {
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000 // convert to seconds from milliseconds bcoz in setTimeout we use seconds due to firebase time format
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};
