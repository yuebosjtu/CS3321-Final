<template>
  <el-container>
    <el-aside width="200px">
      <Sidebar @selectEntity="onSelectEntity" />
    </el-aside>
    <el-container>
      <el-header>
        <el-button type="primary" @click="$router.push('/query')" style="float:right">查询</el-button>
      </el-header>
      <el-main>
        <EntityChart :entity="selectedEntity" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import EntityChart from '../components/EntityChart.vue'

const selectedEntity = ref('patients')

const onSelectEntity = (entity) => {
  selectedEntity.value = entity
}
</script>
