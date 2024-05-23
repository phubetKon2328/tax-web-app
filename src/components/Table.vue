<template>
  <a-space direction="vertical">
    <a-input-search
      v-model:value="value"
      placeholder="ค้นหาชื่อ"
      style="width: 200px; margin: 10px"
      @search="onSearch"
    />
  </a-space>
  <a-table
    :columns="columns"
    :pagination="{ total: 8 }"
    :scroll="{ y: '45vh' }"
    :data-source="data"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <SmileOutlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-divider type="vertical" />
          <a><EditOutlined /> แก้ไขข้อมูล</a>
          <a-divider type="vertical" />
          <a><DeleteOutlined /> ลบรายชื่อ</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import {
  EditOutlined,
  DeleteOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
const value = ref("");
const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  console.log("or use this.value", value.value);
};

const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];
const data = [
  {
    key: "1",
    name: "สุชาติ",
    lastname: "ศรีเจริญพาณิชย์",
    age: 27,
    address: "New York No. 1 Lake Park",
    tags: ["ประธาน"],
  },
  {
    key: "2",
    name: "ญานภา",
    lastname: "วัฒนกิจเวช",
    age: 33,
    address: "London No. 1 Lake Park",
    tags: ["ผู้จัดการทั่วไป"],
  },
  {
    key: "3",
    name: "พงศ์พิสุทธิ์",
    lastname: "สตาภิรมย์",
    age: 25,
    address: "Sidney No. 1 Lake Park",
    tags: ["ผู้จัดการฝ่ายขาย"],
  },
  {
    key: "4",
    name: "เจียมพจน์",
    lastname: "นวลจันทร์",
    age: 45,
    address: "New York No. 1 Lake Park",
    tags: ["ผู้จัดการฝ่ายส่งออก"],
  },
  {
    key: "5",
    name: "ภูริณัฐ",
    lastname: "จันทร์สว่างวงศ์",
    age: 29,
    address: "London No. 1 Lake Park",
    tags: ["ผู้จัดการฝ่ายให้การบริการ"],
  },
  {
    key: "6",
    name: "เขมิกา",
    lastname: "ธรรมรงค์สุนทร",
    age: 19,
    address: "Sidney No. 1 Lake Park",
    tags: ["เลขานุการ"],
  },
  {
    key: "7",
    name: "ภูมิพัฒน์",
    lastname: "ประเสริญวงศ์",
    age: 28,
    address: "New York No. 1 Lake Park",
    tags: ["นักพัฒนา"],
  },
  {
    key: "8",
    name: "สุพิญญา",
    lastname: "มาลัยแก้ว",
    age: 24,
    address: "London No. 1 Lake Park",
    tags: ["นักพัฒนา"],
  },
  {
    key: "9",
    name: "อภิชญา",
    lastname: "สุนทรโปษยาสิน",
    age: 31,
    address: "Sidney No. 1 Lake Park",
    tags: ["นักพัฒนา"],
  },
];
</script>

<style></style>
