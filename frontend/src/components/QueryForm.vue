<template>
  <el-form :model="queryForm" label-width="120px" @submit.prevent="handleQuery">
    <el-form-item label="Search Type">
      <el-select v-model="queryForm.type" placeholder="Select type">
        <el-option label="Patients" value="patients" />
        <el-option label="Doctors" value="doctors" />
        <el-option label="Appointments" value="appointments" />
        <el-option label="Prescriptions" value="prescriptions" />
      </el-select>
    </el-form-item>
    <el-form-item label="Search Term">
      <el-input v-model="queryForm.term" placeholder="Enter search term" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Search</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const queryForm = ref({
  type: 'patients',
  term: ''
})

const handleQuery = () => {
  router.push({
    name: 'query-results',
    query: {
      type: queryForm.value.type,
      term: queryForm.value.term
    }
  })
}
</script>