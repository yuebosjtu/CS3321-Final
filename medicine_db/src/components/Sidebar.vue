<!-- <template>
  <el-menu @select="handleSelect" default-active="patients">
    <el-menu-item index="patients">病人</el-menu-item>
    <el-menu-item index="doctors">医生</el-menu-item>
    <el-menu-item index="drugs">药品</el-menu-item>
  </el-menu>
</template>

<script setup>
const emit = defineEmits(['selectEntity'])

const handleSelect = (index) => {
  emit('selectEntity', index)
}
</script> -->

<template>
  <el-menu @select="handleSelect" default-active="patients">
    <!-- 患者管理 -->
    <el-submenu index="patient-management">
      <template #title>患者管理</template>
      <el-menu-item index="patients">患者信息</el-menu-item>
      <el-menu-item index="medical_records">医疗记录</el-menu-item>
    </el-submenu>

    <!-- 医疗人员 -->
    <el-submenu index="medical-staff">
      <template #title>医疗人员</template>
      <el-menu-item index="doctors">医生信息</el-menu-item>
      <el-menu-item index="nurses">护士信息</el-menu-item>
      <el-menu-item index="staff">员工信息</el-menu-item>
      <el-menu-item index="workers">工人信息</el-menu-item>
    </el-submenu>

    <!-- 预约与诊疗 -->
    <el-submenu index="appointments">
      <template #title>预约与诊疗</template>
      <el-menu-item index="appointments">预约信息</el-menu-item>
      <el-menu-item index="prescriptions">处方信息</el-menu-item>
    </el-submenu>

    <!-- 药品管理 -->
    <el-submenu index="medicine">
      <template #title>药品管理</template>
      <el-menu-item index="medicines">药品信息</el-menu-item>
      <el-menu-item index="pharmacy">药房记录</el-menu-item>
    </el-submenu>

    <!-- 设施管理 -->
    <el-submenu index="facilities">
      <template #title>设施管理</template>
      <el-menu-item index="rooms">房间信息</el-menu-item>
      <el-menu-item index="room_assignments">房间分配</el-menu-item>
      <el-menu-item index="room_types">房间类型</el-menu-item>
      <el-menu-item index="departments">部门信息</el-menu-item>
    </el-submenu>

    <!-- 财务与账单 -->
    <el-submenu index="finance">
      <template #title>财务与账单</template>
      <el-menu-item index="billing">账单信息</el-menu-item>
    </el-submenu>

    <!-- 救护车管理 -->
    <el-submenu index="ambulance">
      <template #title>救护车管理</template>
      <el-menu-item index="ambulances">救护车信息</el-menu-item>
      <el-menu-item index="ambulance_logs">救护车日志</el-menu-item>
    </el-submenu>

    <!-- 血库管理 -->
    <el-menu-item index="blood_bank">血库信息</el-menu-item>
  </el-menu>
</template>

<script setup>
const emit = defineEmits(['selectEntity'])

const handleSelect = (index) => {
  emit('selectEntity', index)
}
</script>