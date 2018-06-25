const Auth = {
  storeToken: (token) => { localStorage.auth_token = token },
  removeToken: () => localStorage.removeItem('auth_token'),
  hasToken: !!localStorage.auth_token,
  storagedToken: localStorage.auth_token
}

export default Auth
