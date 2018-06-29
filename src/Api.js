import axios from 'axios'
import Auth from './Auth'

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

const getChannels = (user_id) =>
  axios.get(`${api_url}/users/${user_id}/channels`, auth_header(Auth.storagedToken()))

export default {
  connection: connection,
  user: {
    login: user_login,
    authByToken: authByToken,
    channels: getChannels
  }
}
