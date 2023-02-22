import { instance } from '@/api/index'

function login(authCode) {
  return instance.get(`/login?auth_code=${authCode}`)
}

function logout() {
  return instance.get('/logout')
}

function reissueAccessToken() {
  return instance.post('/accessToken')
}

export { login, reissueAccessToken, logout }
