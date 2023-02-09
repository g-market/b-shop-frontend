import axios from 'axios'

const config = {
  baseUrl: 'http://b-shop.com:8080'
}

function login(authCode) {
  return axios.get(`${config.baseUrl}/login?auth_code=${authCode}`)
}

function fetchNews() {
  return axios.get(`${config.baseUrl}/news/1.json`)
}

function fetchJobs() {
  return axios.get(`${config.baseUrl}/jobs/1.json`)
}

function fetchAsks() {
  return axios.get(`${config.baseUrl}/ask/1.json`)
}

function fetchUserInfo(username) {
  return axios.get(`${config.baseUrl}/user/${username}.json`)
}

function fetchCommentItem(id) {
  return axios.get(`${config.baseUrl}/item/${id}.json`)
}

export {
  fetchNews,
  fetchJobs,
  fetchAsks,
  fetchUserInfo,
  fetchCommentItem,
  login
}
