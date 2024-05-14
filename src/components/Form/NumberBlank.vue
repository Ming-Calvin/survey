<template>
  <el-input-number
    v-bind="$attrs"
    placeholder="请输入您的答案"
    v-model="internalValue"
    controls-position="right"
    :min="1"
    :max="10"
  >
  </el-input-number>
</template>

<script>
export default {
  name: "NumberBlank",
  props: ["data", "question"],
  data() {
    return {
      internalValue: this.data,
    };
  },
  watch: {
    internalValue(newValue) {
      this.$emit("update:data", newValue);
    },
  },
};
</script>

<style></style>
