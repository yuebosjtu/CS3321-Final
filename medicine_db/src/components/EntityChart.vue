<template>
  <el-card>
    <h3>{{ entity }} 数据图表</h3>
    <p>这里是 {{ entity }} 的数据图示（可接入 ECharts）</p>
  </el-card>
</template>

<script setup>
defineProps(['entity'])
</script>
