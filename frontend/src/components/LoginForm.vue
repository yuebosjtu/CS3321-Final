<template>
  <el-form :model="form" label-width="120px" @submit.prevent="handleSubmit">
    <el-form-item label="Email">
      <el-input v-model="form.email" type="email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="form.password" type="password" show-password />
    </el-form-item>
    <el-form-item label="Role">
      <el-radio-group v-model="form.role">
        <el-radio label="guest">Guest</el-radio>
        <el-radio label="admin">Admin</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Login</el-button>
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
  email: '',
  password: '',
  role: 'guest'
})

const handleSubmit = async () => {
  const success = await authStore.loginUser(form.value)
  if (success) {
    if (form.value.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/guest')
    }
  } else {
    ElMessage.error('Login failed. Please check your credentials.')
  }
}
</script>