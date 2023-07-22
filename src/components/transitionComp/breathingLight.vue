<script setup lang="ts">
import {} from 'vue'
</script>

<template>
  <div class="breathingLight">
    <span class="red"></span>
    <span class="green"></span>
    <span class="blue"></span>
  </div>
</template>

<style scoped>
.breathingLight {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
}
span {
  width: 60px;
  height: 60px;
  margin: 20px;
  border-radius: 50%;
}
.red {
  animation: just1 2s ease-in-out infinite alternate;
}
.green {
  animation: just2 3s ease-in-out infinite alternate;
}
.blue {
  animation: just3 4s ease-in-out infinite alternate;
}
@keyframes just1 {
  0% {
    border: 5px solid rgba(255, 0, 0, 0);
    box-shadow: 0 0 0 rgba(255, 0, 0, 0), 0 0 0 rgba(255, 0, 0, 0) inset;
  }
  100% {
    border: 5px solid rgba(255, 0, 0, 1);
    box-shadow: 0 0 70px rgba(255, 0, 0, 0.7), 0 0 15px rgba(255, 0, 0, 0.5) inset;
  }
}
@keyframes just2 {
  0% {
    border: 5px solid rgba(0, 255, 0, 0);
    box-shadow: 0 0 0 rgba(0, 255, 0, 0), 0 0 0 rgba(0, 255, 0, 0) inset;
  }
  100% {
    border: 5px solid rgba(0, 255, 0, 1);
    box-shadow: 0 0 70px rgba(0, 255, 0, 0.7), 0 0 15px rgba(0, 255, 0, 0.5) inset;
  }
}
@keyframes just3 {
  0% {
    border: 5px solid rgba(0, 0, 255, 0);
    box-shadow: 0 0 0 rgba(0, 0, 255, 0), 0 0 0 rgba(0, 0, 255, 0) inset;
  }
  100% {
    border: 5px solid rgba(0, 0, 255, 1);
    box-shadow: 0 0 70px rgba(0, 0, 255, 0.7), 0 0 15px rgba(0, 0, 255, 0.5) inset;
  }
}
</style>
