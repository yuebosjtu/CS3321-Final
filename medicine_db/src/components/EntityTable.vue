<!-- <template>
  <el-table :data="mockData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="名称" />
    <el-table-column v-if="editable" label="操作">
      <template #default="scope">
        <el-button size="small">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  entity: String,
  editable: Boolean,
  query: String
})

const mockData = computed(() => {
  return [
    { id: 1, name: `${props.entity || props.query || '实体'}1` },
    { id: 2, name: `${props.entity || props.query || '实体'}2` },
  ]
})
</script> -->

<template>
  <el-table :data="mockData" style="width: 100%">
    <!-- 通用列 -->
    <el-table-column prop="id" label="ID" width="80" />
    
    <!-- 动态列 - 根据实体类型显示不同字段 -->
    <template v-if="entity === 'patients'">
      <el-table-column prop="first_name" label="名字" />
      <el-table-column prop="last_name" label="姓氏" />
      <el-table-column prop="date_of_birth" label="出生日期" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="contact_number" label="联系电话" />
    </template>
    
    <template v-else-if="entity === 'doctors'">
      <el-table-column prop="first_name" label="名字" />
      <el-table-column prop="last_name" label="姓氏" />
      <el-table-column prop="specialty" label="专业领域" />
      <el-table-column prop="contact_number" label="联系电话" />
    </template>
    
    <template v-else-if="entity === 'appointments'">
      <el-table-column prop="patient_id" label="患者ID" />
      <el-table-column prop="doctor_id" label="医生ID" />
      <el-table-column prop="appointment_date" label="预约日期" />
      <el-table-column prop="appointment_time" label="预约时间" />
      <el-table-column prop="status" label="状态" />
    </template>
    
    <!-- 其他实体的列定义... -->
    <!-- 可以根据需要继续添加其他实体的列定义 -->
    
    <!-- 操作列（管理员可见） -->
    <el-table-column v-if="editable" label="操作" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  entity: String,
  editable: Boolean,
  query: String
})

const emit = defineEmits(['edit', 'delete'])

const handleEdit = (row) => {
  emit('edit', row)
}

const handleDelete = (row) => {
  emit('delete', row)
}

const mockData = computed(() => {
  // 根据实体类型返回不同的模拟数据
  switch(props.entity) {
    case 'patients':
      return [
        { id: 1, first_name: '张', last_name: '三', date_of_birth: '1980-05-15', gender: '男', contact_number: '13800138000' },
        { id: 2, first_name: '李', last_name: '四', date_of_birth: '1990-08-20', gender: '女', contact_number: '13900139000' }
      ]
    case 'doctors':
      return [
        { id: 1, first_name: '王', last_name: '医生', specialty: '心脏科', contact_number: '13700137000' },
        { id: 2, first_name: '赵', last_name: '医生', specialty: '神经科', contact_number: '13600136000' }
      ]
    case 'appointments':
      return [
        { id: 1, patient_id: 1, doctor_id: 1, appointment_date: '2023-06-01', appointment_time: '09:00', status: '已完成' },
        { id: 2, patient_id: 2, doctor_id: 2, appointment_date: '2023-06-02', appointment_time: '10:30', status: '已预约' }
      ]
    // 可以继续添加其他实体的模拟数据
    default:
      return [
        { id: 1, name: `${props.entity || props.query || '实体'}1` },
        { id: 2, name: `${props.entity || props.query || '实体'}2` },
      ]
  }
})
</script>