import axios from 'axios'

export const Api = axios.create({
  baseURL: 'https://scoreboard-backend-develop.onrender.com/api',
  // `http://localhost:3333/api`,
  // 'http://3.20.235.215:5000/api',
})
