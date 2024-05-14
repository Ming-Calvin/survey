<template>
  <div>
    <el-button class="upFiles" type="primary"> 选择问卷（不超过4M）</el-button>
  </div>
</template>

<script>
export default {
  name: "File",
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

<style lang="scss" scoped>
button.el-button.upFiles.el-button--primary {
  width: 100%;
  height: 40px;
  margin: 30px 0;
}
</style>
