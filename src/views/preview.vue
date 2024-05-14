<template>
  <div class="container">
    <Main class="main">
      <template #survey-button>
        <div class="survey-button">
          <el-button type="primary"> 保存 </el-button>
          <el-button type="danger"> 提交 </el-button>
        </div>
      </template>
    </Main>
  </div>
</template>

<script>
export default {
  name: "Preview",
  created() {
    this.$store
      .dispatch("survey/getSurvey", {
        id: this.$route.query.id,
      })
      .then((res) => {
        this.survey = res.questions;
      });
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";
.container {
  background-image: url("../assets/background.png");
  background-size: auto;
  background-repeat: repeat;
  background-position: center center;
  background-blend-mode: overlay;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px 0;

  .main {
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.1);
  }

  .survey-button {
    @include flex;
    @include flex-j-a(center, center);
    padding: 40px;
  }

  .el-button.el-button--primary {
    margin-right: 100px;
  }
}
</style>
