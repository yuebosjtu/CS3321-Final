<template>
  <el-card>
    <h3>查询结果</h3>
    <EntityTable :query="query" />
  </el-card>
</template>

<script setup>
import { useRoute } from 'vue-router'
import EntityTable from '../components/EntityTable.vue'

const route = useRoute()
const query = route.query.q
</script>
