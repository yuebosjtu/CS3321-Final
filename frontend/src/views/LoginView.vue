<template>
  <div class="login">
    <navbar />
    <div class="form-container">
      <login-form />
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>