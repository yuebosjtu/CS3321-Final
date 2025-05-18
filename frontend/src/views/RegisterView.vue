<template>
  <div class="register">
    <navbar />
    <div class="form-container">
      <register-form />
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import RegisterForm from '../components/RegisterForm.vue'
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>