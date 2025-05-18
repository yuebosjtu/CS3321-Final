import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (userData) => api.post('/auth/register', userData)
export const getPatients = () => api.get('/patients')
export const getDoctors = () => api.get('/doctors')
export const getAppointments = () => api.get('/appointments')
export const getPrescriptions = () => api.get('/prescriptions')
export const queryData = (params) => api.post('/query', params)
export const createRecord = (data) => api.post('/records', data)
export const updateRecord = (id, data) => api.put(`/records/${id}`, data)
export const deleteRecord = (id) => api.delete(`/records/${id}`)