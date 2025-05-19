<template>
  <el-card class="login-card">
    <h2>登录</h2>
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="form.role" placeholder="选择身份">
          <el-option label="管理员" value="admin" />
          <el-option label="游客" value="visitor" />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="text" @click="$router.push('/register')">没有账号？注册</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
  role: '',
})

const login = () => {
  if (form.role === 'admin') {
    router.push('/admin')
  } else if (form.role === 'visitor') {
    router.push('/visitor')
  }
}
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
}
</style>
