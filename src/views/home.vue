<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="title">问卷调查系统</div>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside style="width: 200px">
          <div
            class="aside-list"
            v-for="(item, index) in asideList"
            :key="index"
            :class="asideActive == item.component ? 'active' : ''"
            @click="asideActive = item.component"
          >
            {{ item.label }}
          </div>
        </el-aside>

        <!-- 主要内容 -->
        <el-main>
          <component :is="asideActive"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NewSurveyList from "@/components/SurveyList/newSurveyList.vue";
import MySurveyList from "@/components/SurveyList/mySurveyList.vue";
import TemplateList from "@/components/SurveyList/templateList.vue";

export default {
  name: "Home",
  components: { NewSurveyList, MySurveyList, TemplateList },
  data() {
    return {
      // 侧边栏列表
      asideList: [
        { label: "问卷发起", component: "newSurveyList" },
        { label: "我的问卷", component: "mySurveyList" },
        { label: "问卷模板", component: "templateList" },
      ],
      // 激活标签
      asideActive: "newSurveyList",
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";

.title {
  @include full-size;
  @include flex;
  @include flex-j-a(start, center);
  padding-left: 30px;
  font-size: 19px;
  font-weight: bold;
  color: #f81313;
}

.aside-list {
  width: 100%;
  height: 56px;
  @include flex;
  @include flex-j-a(center, center);
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
}

.aside-list.active {
  color: #fc4e33;
  font-weight: 600;
}

.aside-list:hover {
  background-color: #fc4e33;
  color: #ffffff;
}
</style>
