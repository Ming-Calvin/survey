<template>
  <div class="tableCard">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "TableCard",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.tableCard {
  padding: 24px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
