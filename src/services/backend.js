import axios from 'axios';

export const backend = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API_URL}`,
});

