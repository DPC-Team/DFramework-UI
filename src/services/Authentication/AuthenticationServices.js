import axios from 'axios'

export const authenticate = async (username, password) => {
  const response = await axios.post('https://localhost:7121/api/authenticate', {
    username,
    password,
  })

  const user = response.data
  if (user && user.token) localStorage.setItem('token', user.token)
  return user
}

export const Logout = async () => {
  localStorage.removeItem('token')
}
