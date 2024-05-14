<template>
  <div class="aside">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <component :is="activeName"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OutLine from "@/components/Aside/OutLine.vue";
import Type from "@/components/Aside/Type.vue";
export default {
  name: "Aside",
  components: { OutLine, Type },
  data() {
    return {
      // 激活tab
      activeName: "Type",
      tabList: [
        { label: "题型", name: "Type" },
        { label: "问卷大纲", name: "OutLine" },
      ],
    };
  },
  methods: {
    // 切换tab
    handleClick() {},
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";

.aside {
  @include full-size;
}

::v-deep .el-tabs__nav-scroll {
  @include flex;
  @include flex-j-a(center, center);
  margin-top: 24px;

  .el-tabs__item {
    min-width: 100px;
    text-align: center;
    background-color: #f7f8fa;
  }

  .el-tabs__item:hover {
    color: #fc4e33;
  }

  .el-tabs__item.is-active {
    background-color: #ffffff;
    color: #fc4e33;
  }
}
</style>
