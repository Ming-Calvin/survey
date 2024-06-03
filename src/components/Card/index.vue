<template>
  <div
    class="card"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="isChoose ? { borderColor: '#fc4e33' } : ''"
  >
    <div class="move drag-btn" v-if="isChoose">
      <i class="el-icon-more"></i>
      <i class="el-icon-more" style="margin-top: -10px"></i>
    </div>

    <div class="ctrl-btn" v-if="isChoose">
      <el-button
        type="info"
        v-for="(item, index) in showBtnList"
        :key="index"
        :class="item.class"
        @click="handler(item.function)"
        >{{ item.label }}</el-button
      >
    </div>

    <slot name="form"></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["isActive"],
  data() {
    return {
      // 是否选选中
      isChoose: false,
      // 按钮列表
      buttonList: [
        {
          label: "编辑选项",
          function: "saveOptions",
          class: "save-options",
          isActive: "false",
        },
        {
          label: "确认选项",
          function: "confirmOptions",
          class: "save-options",
          isActive: "true",
        },
        {
          label: "必填",
          function: "required",
          class: "required",
          isRequired: "false",
        },
        {
          label: "取消必填",
          function: "cancelRequired",
          class: "cancel-required",
          isRequired: "true",
        },
        {
          label: "复制题目",
          function: "copyQuestion",
          class: "copy-question-btn",
        },
        { label: "删除", function: "removeQuestion", class: "remove-btn" },
      ],
    };
  },
  methods: {
    // 鼠标进入事件
    handleMouseEnter() {
      this.isEdit ? (this.isChoose = true) : "";
    },
    // 鼠标离开事件
    handleMouseLeave() {
      this.isEdit ? (this.isChoose = false) : "";
    },
    handler(fun) {
      this.$emit("action", fun);
    },
  },
  computed: {
    showBtnList() {
      // 被激活
      let btnList = [];
      if (this.isActive) {
        btnList = this.buttonList.filter((item) => {
          return !item.isActive || item.isActive == "true";
        });
      } else {
        btnList = this.buttonList.filter((item) => {
          return !item.isActive || item.isActive == "false";
        });
      }

      console.log(btnList, 'btnList');
      return btnList;
    },
    isEdit() {
      return this.$route.query.edit === "true";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";

::v-deep .el-button {
  min-width: 0px;
  padding: 5px 16px;
}

.card {
  padding: 40px 60px;
  box-sizing: border-box;
  border: 1px solid transparent;
  @include relative;
  background-color: #ffffff;
}

.move {
  @include flex;
  flex-direction: column;
  @include absolute(10px, 50%, "", "");
  transform: translateX(-50%, 0);
  color: #fc4e33;
  cursor: move;
  font-size: 17px;
}

.dragging .move {
  color: #ffffff;
}

.ctrl-btn {
  @include absolute("", 15px, 15px, "");
}

.drag-btn {
  cursor: move;
}
</style>
