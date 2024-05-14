<template>
  <el-radio-group v-model="internalValue" v-bind="$attrs" @change="radioChange">
    <template v-if="!isEditable">
      <el-radio
        v-for="(item, index) in question.options"
        :key="index + item.rId"
        :label="item.rId"
      >
        {{ item.optionName }}
      </el-radio>
    </template>

    <template v-else>
      <el-radio
        v-for="(item, index) in question.options"
        :key="index + item.rId"
        :label="item.optionName"
      >
        <el-input v-model="item.optionName" placeholder="请输入内容"></el-input>

        <edit-controls
          :options.sync="question.options"
          :index="index"
          :defaultOptions="defaultOptions"
        ></edit-controls>
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
export default {
  name: "Radio",
  props: ["data", "question", "isEditable"],
  data() {
    return {
      internalValue: this.data,
      defaultOptions: { rId: null, optionName: "" },
    };
  },
  methods: {
    // 单选值改变
    radioChange(val) {
      const chooseItem = this.question.options.filter(
        (item) => item.rId === val
      )[0];

      if (chooseItem.toId) {
        // 选项跳题操作
        this.$EventBus.$emit(
          "skip-to-question",
          this.question.qId,
          chooseItem.toId
        );
      } else if (this.question.toId) {
        // 问题挑剔操作
        this.$EventBus.$emit(
          "skip-to-question",
          this.question.qId,
          this.question.toId
        );
      }
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
.el-radio-group {
  margin-top: 20px;
}
</style>
