import axios from 'axios'
import apiClient from 'src/utils/apiClient'
const apiUrl = process.env.REACT_APP_API_URL

export const authenticate = (username, password) => {
  return axios
    .post(`${apiUrl}/authenticate`, {
      username,
      password,
    })
    .then((response) => {
      const user = response.data
      if (user && user.token) {
        localStorage.setItem('token', user.token)
        localStorage.setItem('user', JSON.stringify({ ...user, token: undefined }))
      }
    })
}

export const Logout = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const changePassword = async (changePasswordRequest) => {
  const user = localStorage.getItem('user')
  if (user) {
    const userObj = JSON.parse(user)
    changePasswordRequest.username = userObj.username
  }
  return apiClient.post(`/profile/changepassword`, changePasswordRequest).then((response) => {})
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  if (user) {
    const userObj = JSON.parse(user)
    return userObj
  }
}
