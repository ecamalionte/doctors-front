import axios from 'axios'

const api_url = 'http://localhost:4000/api'

const connection = () =>
  axios.get(api_url)

const user_login = credentials =>
  axios.post(`${api_url}/auth`, { credentials })

const authByToken = token =>
  axios.post(`${api_url}/auth/token`, { token: token })

export default {
  connection: connection,
  user: {
    login: user_login,
    authByToken: authByToken,
  }
}
