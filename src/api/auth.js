import { instance } from '@/api/index'
import jwt from '@/api/jwt'

function login(authCode) {
  return instance.get(`/login?auth_code=${authCode}`)
}

async function reissueAccessToken() {
  const res = await instance.get('/accessToken')
  const accessToken = res.data.accessToken
  jwt.saveToken(accessToken)
}

export { login, reissueAccessToken }
