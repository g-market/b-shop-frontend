import { instanceWithAuth as members } from '@/api/index'

function fetchMember() {
  return members.get('/members/me')
}

function patchMember(memberUpdateRequest) {
  return members.patch(`/members/me`, memberUpdateRequest)
}

export { fetchMember, patchMember }
