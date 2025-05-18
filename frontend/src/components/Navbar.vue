<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    class="navbar"
    :router="true"
  >
    <el-menu-item index="/">Home</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item v-if="!isAuthenticated" index="/login">Login</el-menu-item>
    <el-menu-item v-if="!isAuthenticated" index="/register">Register</el-menu-item>
    <el-sub-menu v-if="isAuthenticated" index="user">
      <template #title>
        <el-icon><user /></el-icon>
        <span>User</span>
      </template>
      <el-menu-item @click="logout">Logout</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { User } from '@element-plus/icons-vue'
import { useAuthStore } from '../stores/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.navbar {
  padding: 0 20px;
}
</style>