import axios from 'axios'

export const Api = axios.create({
  baseURL:
    'https://scoreboard-backend-develop.onrender.com/api',
})
