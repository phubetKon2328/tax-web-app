<template>
  <a-tooltip placement="top">
    <template #title>
      <span>
        <slot></slot>
      </span>
    </template>
    <div>?</div>
  </a-tooltip>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  border: 1px solid #b7b7b7;
  background-color: #ffffff;
  height: 15px;
  border-radius: 100%;
  width: 15px;
  display: inline-flex;
  font-size: 12px;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
