<script setup lang="ts"></script>

<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style>
.shadow-lt {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.inline-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
}
</style>
