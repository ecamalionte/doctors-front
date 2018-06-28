import axios from 'axios'

const api_url = 'http://localhost:4000/api'

const connection = () =>
  axios.get(api_url)

const user_login = credentials =>
  axios.post(`${api_url}/accounts/login`, credentials)

const auth_header = token => (
  { headers: { authorization: `Bearer: ${token}` } }
)

const authByToken = (token, user_id) =>
  axios.get(`${api_url}/users/${user_id}`, auth_header(token))

export default {
  connection: connection,
  user: {
    login: user_login,
    authByToken: authByToken,
  }
}
