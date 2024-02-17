import axios from 'axios'

export const Api = axios.create({
  baseURL:
    process.env.ENV === 'prod' ? process.env.API_HOST : 'http://localhost:3333',
})
