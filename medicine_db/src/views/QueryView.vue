<template>
  <el-card>
    <h3>请输入查询条件</h3>
    <el-input v-model="query" placeholder="如 病人名 / 医生名..." />
    <el-button type="primary" @click="search">查询</el-button>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

const search = () => {
  router.push({ path: '/query-result', query: { q: query.value } })
}
</script>

<style scoped>
.el-card {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
}
</style>
