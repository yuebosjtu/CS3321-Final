<template>
  <div class="data-display">
    <h2>Medical Database</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="type" label="Type" />
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="status" label="Status" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPatients, getDoctors, getAppointments, getPrescriptions } from '../api'

const tableData = ref([])

onMounted(async () => {
  try {
    // 根据当前路由或其他条件获取不同数据
    const response = await getPatients()
    tableData.value = response.data.map(item => ({
      id: item.patient_id,
      name: `${item.first_name} ${item.last_name}`,
      type: 'Patient',
      date: item.created_at,
      status: 'Active'
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>