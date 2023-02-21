import { members } from '@/api/index'

function fetchMember() {
  return members.get(`/members/me`)
}

export { fetchMember }
