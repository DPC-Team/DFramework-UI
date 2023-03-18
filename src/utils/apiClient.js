import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL

const apiClient = axios.create({
  baseURL: apiUrl,
})

apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

export default apiClient
