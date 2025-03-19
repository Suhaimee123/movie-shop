// /utils/Api.ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
  },
});

export default axiosApi;
