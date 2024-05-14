<template>
  <div>
    <el-dialog title="设置跳题" :visible.sync="skipQuestionVisible" width="30%">
      <el-radio-group v-model="chooseQuestion">
        <el-radio
          v-for="(item, index) in skipList"
          :label="item.qId"
          :key="index"
        >
          {{ item.qTitle }}
        </el-radio>
      </el-radio-group>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelSkip"> 取 消 </el-button>
        <el-button type="danger" @click="confirmSkip"> 确 认 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "skipQuestion",
  data() {
    return {
      skipQuestionVisible: false,
      chooseQuestion: "",
    };
  },
  props: ["index"],
  computed: {
    ...mapState("survey", {
      questions: (state) => state.questions,
    }),
    // 跳题列表
    skipList() {
      return this.questions.slice(this.index + 1);
    },
  },
  methods: {
    skipQuestion(toId) {
      this.chooseQuestion = toId;
      this.skipQuestionVisible = true;
    },
    cancelSkip() {
      this.$emit("updateToId", "");
      this.skipQuestionVisible = false;
      this.$message.warning("取消设置跳题");
    },
    confirmSkip() {
      this.$emit("updateToId", this.chooseQuestion);
      this.skipQuestionVisible = false;
      this.$message.success("设置跳题成功");
    },
  },
};
</script>

<style scoped lang="scss"></style>
