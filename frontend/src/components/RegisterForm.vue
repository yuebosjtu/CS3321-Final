<template>
  <el-form :model="form" label-width="120px" @submit.prevent="handleSubmit">
    <el-form-item label="First Name">
      <el-input v-model="form.firstName" />
    </el-form-item>
    <el-form-item label="Last Name">
      <el-input v-model="form.lastName" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="form.email" type="email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="form.password" type="password" show-password />
    </el-form-item>
    <el-form-item label="Confirm Password">
      <el-input v-model="form.confirmPassword" type="password" show-password />
    </el-form-item>
    <el-form-item label="Role">
      <el-radio-group v-model="form.role">
        <el-radio label="guest">Guest</el-radio>
        <el-radio label="admin">Admin</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Register</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'guest'
})

const handleSubmit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.error('Passwords do not match')
    return
  }
  
  const success = await authStore.registerUser(form.value)
  if (success) {
    ElMessage.success('Registration successful. Please login.')
    router.push('/login')
  } else {
    ElMessage.error('Registration failed. Please try again.')
  }
}
</script>