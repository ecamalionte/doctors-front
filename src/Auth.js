import jwt_decode from 'jwt-decode'

const storagedUserID = () => {
  if (!!localStorage.auth_token)
    return jwt_decode(localStorage.auth_token).sub
}

const storagedToken = () => localStorage.auth_token

const Auth = {
  storeToken: (token) => { localStorage.auth_token = token },
  removeToken: () => localStorage.removeItem('auth_token'),
  user_id: storagedUserID,
  hasToken: !!localStorage.auth_token,
  storagedToken: storagedToken
}

export default Auth
