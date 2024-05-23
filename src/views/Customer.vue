<template>
  <a-layout-header style="background: #fff; padding: 0">
    </a-layout-header>
    <a-layout-content style="margin: 0 16px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>พนักงาน</a-breadcrumb-item>
        <a-breadcrumb-item>ข้อมูลพนักงาน</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <Table />
      </div>
    </a-layout-content>
</template>

<script setup>
import Table from '../components/Table.vue'
</script>

<style>

</style>