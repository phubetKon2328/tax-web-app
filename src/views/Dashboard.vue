<template>
  <a-layout style="min-height: 100vh">
    <Sidebar />
    <Content />
  </a-layout>
</template>
<script setup>
import Sidebar from "../components/Sidebar.vue";
import Content from "../components/Content.vue";
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
