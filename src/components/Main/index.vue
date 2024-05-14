<template>
  <div class="main">
    <div class="question">
      <!-- 图片 -->
      <div class="survey_top_img">
        <img :src="require('@/assets/banner-red.png')" />
      </div>

      <!-- 标题 -->
      <div class="survey_title">测试</div>

      <!-- 提醒 -->
      <div class="survey_note">
        为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！
      </div>

      <!-- 问题内容 -->
      <survey-content></survey-content>

      <!--问卷按钮-->
      <slot name="survey-button"></slot>
    </div>
  </div>
</template>

<script>
import SurveyContent from "@/components/Main/content.vue";

export default {
  name: "Main",
  components: { SurveyContent },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";

.question {
  width: 950px;
  height: 100%;
  background-color: #ffffff;
  overflow: auto;
}

.survey_top_img {
  width: 100%;
  height: 200px;
  @include relative;
  overflow: hidden;

  img {
    height: 200px;
    width: auto;
    min-width: 100%; // 至少宽度一致
    @include absolute(50%, "", "", 50%);
    @include translate(-50%, -50%);
  }
}

.survey_title {
  text-align: center;
  outline-style: none;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #fc4e33;
  margin: 25px 50px;
}

.survey_note {
  margin: 20px 50px;
  border: 1px solid #e6e6e6;
  padding: 10px;
  font-size: 15px;
  line-height: 24px;
}
</style>
