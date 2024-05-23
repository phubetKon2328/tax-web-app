<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <router-link :to="{ name: 'Home' }">
          <PieChartOutlined />
          <span>หน้าแรก</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <UserOutlined />
            <span>พนักงาน</span>
          </span>
        </template>
        <a-menu-item key="3">
          <router-link :to="{ name: 'Customer' }">
            <SolutionOutlined />
            <span>ข้อมูลพนักงาน</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="4">
          <router-link :to="{ name: 'TaxManage' }">
            <CalculatorOutlined />
            <span>จัดการภาษี</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="5">
          <router-link :to="{ name: 'TaxCalculate' }">
            <FilePdfOutlined />
            <span> ออกใบรายการภาษี </span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import {
  PieChartOutlined,
  UserOutlined,
  SolutionOutlined,
  FilePdfOutlined,
  CalculatorOutlined
} from "@ant-design/icons-vue";
import { ref } from "vue";
const collapsed = ref(false);
const selectedKeys = ref(["1"]);
</script>

<style></style>
