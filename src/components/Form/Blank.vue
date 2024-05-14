<template>
  <el-input
    placeholder="请输入您的答案"
    v-model="internalValue"
    v-bind="$attrs"
    clearable
  >
  </el-input>
</template>

<script>
export default {
  name: "Blank",
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
