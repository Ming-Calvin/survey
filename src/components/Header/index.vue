<template>
  <div class="header">
    <el-button type="primary" @click="preview"> 预览 </el-button>

    <el-button type="danger" @click="saveSurvey"> 保存 </el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState("survey", {
      questions: (state) => state.questions,
    }),
  },
  data() {
    return {};
  },
  methods: {
    saveSurvey() {
      console.log(this.questions, 'this.questions');
      this.$store
        .dispatch("survey/updateSurvey", {
          id: this.$route.query.id,
          questions: this.questions,
        })
        .then((res) => {
          console.log(res);
        });
    },
    preview() {
      this.$router.push({
        path: "/survey/preview",
        query: { id: this.$route.query.id },
      });
    },
  },
  mounted() {
    this.$EventBus.$on("changePicture", () => {});
  },
  destroyed() {
    this.$EventBus.$off("changePicture", () => {});
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/base";

.header {
  @include full-size;
  @include flex;
  @include flex-j-a(space-between, center);
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
