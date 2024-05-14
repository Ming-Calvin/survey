<template>
  <div class="controlBtn">
    <!--添加-->
    <i class="el-icon-circle-plus-outline" @click="addOptions" />
    <!--删除-->
    <i class="el-icon-remove-outline" @click="removeOptions" />
    <!--跳题-->
    <i class="el-icon-connection" @click="skipQuestion" />

    <skipQuestion
      :options.sync="internalValue"
      :index="index"
      ref="skipQuestion"
      @updateToId="updateToId"
    ></skipQuestion>
  </div>
</template>

<script>
export default {
  name: "EditControls",
  props: ["options", "index", "defaultOptions"],
  data() {
    return {
      internalValue: this.options,
      order: this.index,
    };
  },
  methods: {
    addOptions() {
      this.internalValue.splice(++this.order, 0, {
        ...this.defaultOptions,
        sortNum: this.order,
      });
    },
    removeOptions() {
      if (this.internalValue.length <= 1) {
        this.$message.error("选项不能为空");
        return;
      }

      this.$confirm(
        `是否删除${this.internalValue[this.order].optionName}`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          confirmButtonClass: "confirmDeleteOption",
          cancelButtonClass: "cancelDeleteOption",
          showClose: false,
          type: "warning",
        }
      )
        .then(() => {
          this.internalValue.splice(this.order, 1);
        })
        .catch(() => this.$message.warning("取消删除"));
    },
    skipQuestion() {
      this.$refs.skipQuestion.skipQuestion(this.internalValue[this.order].toId);
    },
    updateToId(toId) {
      this.internalValue[this.order].toId = toId;
    },
  },
  watch: {
    internalValue(newValue) {
      this.$emit("update:data", newValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";

.controlBtn {
  @include flex;
  @include flex-j-a(space-between, center);
  width: 10%;
}

.el-button {
  padding: 10px 20px;
  margin-right: 10px;
}
</style>
