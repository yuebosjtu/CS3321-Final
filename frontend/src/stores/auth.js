import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, register } from '../api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const userRole = ref(null)
  const isAuthenticated = ref(false)

  const loginUser = async (credentials) => {
    try {
      const response = await login(credentials)
      token.value = response.data.token
      userRole.value = response.data.role
      isAuthenticated.value = true
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const registerUser = async (userData) => {
    try {
      const response = await register(userData)
      return response.data.success
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = () => {
    token.value = null
    userRole.value = null
    isAuthenticated.value = false
  }

  return { token, userRole, isAuthenticated, loginUser, registerUser, logout }
})