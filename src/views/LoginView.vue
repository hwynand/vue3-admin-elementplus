<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'

</script>
<template>
  <div class="container">
    <div class="card">
      <h2>Login</h2>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,190,228,1) 41%);
}
.card {
  background-color: azure;
  min-height: 400px;
  width: 35%;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card h2 {
  margin-bottom: 2rem;
}
</style>