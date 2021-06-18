import axios from 'axios';

export const weather = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

