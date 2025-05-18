<template>
  <div class="data-management">
    <h2>Database Management</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Patients" name="patients">
        <patient-management />
      </el-tab-pane>
      <el-tab-pane label="Doctors" name="doctors">
        <doctor-management />
      </el-tab-pane>
      <el-tab-pane label="Appointments" name="appointments">
        <appointment-management />
      </el-tab-pane>
      <el-tab-pane label="Prescriptions" name="prescriptions">
        <prescription-management />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PatientManagement from './PatientManagement.vue'
import DoctorManagement from './DoctorManagement.vue'
import AppointmentManagement from './AppointmentManagement.vue'
import PrescriptionManagement from './PrescriptionManagement.vue'

const activeTab = ref('patients')
</script>