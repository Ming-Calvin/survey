<template>
  <div class="typeList">
    <Draggable
      forceFallback="true"
      handle=".type"
      animation="100"
      ghostClass="ghost"
      chosenClass="chosen"
      dragClass="dragging"
      :options="options"
    >
      <div
        v-for="(item, index) in typeList"
        :key="index"
        class="type"
        :type="item.name"
      >
        {{ item.label }}
      </div>
    </Draggable>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Draggable from "vuedraggable";

export default {
  name: "AsideType",
  components: { Draggable },
  data() {
    return {
      typeList: [
        { label: "单选题", name: "Radio" },
        { label: "多选题", name: "CheckBok" },
        { label: "填空题", name: "Blank" },
        { label: "填空题（数字）", name: "NumberBlank" },
        { label: "填空题（多选）", name: "MultiBlank" },
        { label: "图片上传", name: "File" },
        { label: "评分", name: "Rate" },
      ],
      options: {
        group: {
          name: "questions",
          pull: "clone",
          put: false,
        },
        sort: false,
      },
    };
  },
  computed: {
    ...mapState("survey", {
      // 问卷内容
      questions: (state) => state.questions,
    }),
  },
};
</script>

<style scoped lang="scss">
.type {
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #f9f9f9;
  margin: 8px 24px;
  box-sizing: border-box;
  cursor: move;
}
</style>
