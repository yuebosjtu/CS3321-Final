<template>
  <el-container>
    <el-aside width="200px">
      <Sidebar @selectEntity="onSelectEntity" />
    </el-aside>
    <el-main>
      <EntityTable :entity="selectedEntity" editable />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import EntityTable from '../components/EntityTable.vue'

const selectedEntity = ref('patients')

const onSelectEntity = (entity) => {
  selectedEntity.value = entity
}
</script>
