import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-950d2.firebaseio.com/'
});

export default instance;
