<template>
  <el-container>
    <!-- 头部 -->
    <el-header> <Header /> </el-header>

    <el-container>
      <!--侧边栏-->
      <el-aside> <Aside /> </el-aside>
      <!--主要内容-->
      <el-main> <Main /> </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "survey",
  data() {
    return {};
  },
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

<style lang="scss" scoped></style>
