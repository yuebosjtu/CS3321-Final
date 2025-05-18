<template>
  <div class="guest">
    <navbar />
    <div class="content">
      <query-form />
      <data-display />
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import QueryForm from '../components/QueryForm.vue'
import DataDisplay from '../components/DataDisplay.vue'
</script>