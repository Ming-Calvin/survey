<template>
  <div>
    <template v-if="isEditable">
      <div class="qExplain">
        <span>标题：</span>

        <div class="title">
          <el-input v-model="internalQTitle" placeholder="请输入标题" />

          <!--跳题-->
          <i class="el-icon-connection" @click="skipQuestion" />
        </div>
      </div>

      <div class="qExplain">
        <span>说明：</span>
        <el-input
          v-model="internalQExplain"
          placeholder="请输入说明"
        ></el-input>
      </div>

      <skipQuestion
        :options.sync="internalValue"
        ref="skipQuestion"
        :index="index"
        @updateToId="updateToId"
      ></skipQuestion>
    </template>

    <template v-else>
      <div class="qTitle">{{ fieldLabel }}</div>
      <div class="qExplain">{{ qExplain }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "QuestionTitle",
  props: [
    "isEditable",
    "qTitle",
    "qExplain",
    "fieldLabel",
    "question",
    "index",
  ],
  data() {
    return {
      internalValue: this.question,
      internalQTitle: this.qTitle,
      internalQExplain: this.qExplain,
    };
  },
  methods: {
    skipQuestion() {
      this.$refs.skipQuestion.skipQuestion(this.internalValue.toId);
    },
    updateToId(toId) {
      this.$set(this.internalValue, "toId", toId);
    },
  },
  watch: {
    internalValue(newValue) {
      this.$emit("update:question", newValue);
    },
    internalQTitle(newValue) {
      this.$emit("update:qTitle", newValue);
    },
    internalQExplain(newValue) {
      this.$emit("update:qExplain", newValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";

.qTitle {
  font-size: 17px;
  font-weight: bold;
}

.qExplain {
  font-size: 14px;
  padding-top: 10px;
  word-break: break-all;
  color: #a8a8a8;
}

.title {
  @include flex;
  @include flex-j-a(space-between, center);

  .el-input {
    width: 95%;
  }

  i {
    color: #606266;
  }
}
</style>
