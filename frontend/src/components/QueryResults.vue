<template>
  <div class="query-results">
    <h2>Search Results for "{{ searchTerm }}" in {{ searchType }}</h2>
    <el-table :data="results" style="width: 100%">
      <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { queryData } from '../api'

const route = useRoute()
const results = ref([])
const columns = ref([])

const searchType = computed(() => route.query.type)
const searchTerm = computed(() => route.query.term)

onMounted(async () => {
  try {
    const response = await queryData({
      type: searchType.value,
      term: searchTerm.value
    })
    
    results.value = response.data.results
    if (results.value.length > 0) {
      columns.value = Object.keys(results.value[0]).map(key => ({
        prop: key,
        label: key.replace('_', ' ').toUpperCase()
      }))
    }
  } catch (error) {
    console.error('Error fetching query results:', error)
  }
})
</script>