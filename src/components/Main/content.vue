<template>
  <el-form v-model="formData">
    <Draggable
      forceFallback="true"
      handle=".drag-btn"
      animation="100"
      ghostClass="ghost"
      chosenClass="chosen"
      dragClass="dragging"
      @update="dragUpdate"
      @add="addQuestion"
      group="questions"
      style="min-height: calc(100vh - 500px)"
    >
      <card
        v-for="(item, index) in showQuestion"
        :key="item.sortNum + Math.random()"
        :id="item.sortNum"
        :isActive="activeQuestion === index"
        @action="(fun) => handleAction(fun, index)"
        v-clickOutSide="{ handler: clickOutSide, params: index }"
      >
        <template #form>
          <QuestionTitle
            :isEditable="isEditable(index)"
            :qTitle.sync="item.qTitle"
            :qExplain.sync="item.qExplain"
            :fieldLabel="fieldLabel(item)"
            :index="index"
            :question.sync="item"
          ></QuestionTitle>

          <el-form-item
            prop="item.require"
            :required="item.mustRequired == '0'"
          >
            <component
              :is="item.qType"
              :data.sync="formData[item.qId]"
              :question="item"
              :disabled="disabled"
              :isEditable="isEditable(index)"
            />
          </el-form-item>
        </template>
      </card>
    </Draggable>
  </el-form>
</template>

<script>
import Card from "@/components/Card/index.vue";
import Draggable from "vuedraggable";
import { mapState } from "vuex";
import questionModel from "@/components/Aside/questionModel";

export default {
  name: "surveyContent",
  components: { Card, Draggable },
  data() {
    return {
      // 问卷绑定属性
      formData: {},
      // 是否禁用选中
      disabled: this.$route.query.edit === "true",
      // 当前激活问题
      activeQuestion: "",
      // 隐藏的题目列表
      hiddenList: [],
      showQuestion: [],
    };
  },
  computed: {
    ...mapState("survey", {
      // 问卷内容
      questions: (state) => state.questions,
    }),
    fieldLabel: function () {
      return (item) => {
        const title =
          item.qType == "number_blank"
            ? `${item.qTitle}（数字）`
            : `${item.qTitle}`;
        return `${item.sortNum ? item.sortNum + "、" : ""}${title}`;
      };
    },
    // 跳题相关题目
    skipRelative: function () {
      let relatives = [];
      this.questions.forEach((item) => {
        if (item.toId) {
          relatives.push(item.toId);
        } else if (item.options.some((i) => !!i.toQId)) {
          const arr = item.options.filter((oi) => !!oi.toQId);
          relatives.push(...arr.map((i) => i.toQId));
        }
      });
      return relatives;
    },
    // 是否可以编辑
    isEditable: function () {
      return (index) => {
        return index === this.activeQuestion;
      };
    },
  },
  methods: {
    addQuestion({ target, newIndex, clone }) {
      // 查询所有class为"type"的<div>元素
      const elements = target.querySelectorAll("div.type");
      // 遍历这些元素，并从其父元素中移除它们
      elements.forEach((element) => {
        element.parentNode.removeChild(element);
      });

      this.questions.splice(
        newIndex,
        0,
        questionModel(newIndex)[clone.getAttribute("type")]
      );
      this.surveySort();
    },
    dragUpdate({ oldIndex, newIndex }) {
      /*
      1. this.config.splice(newIndex, 1, this.config[oldIndex]):
        splice() 方法用于修改数组内容，它可以添加、删除或替换数组元素。
        第一个参数 newIndex 指定了修改的起始位置。
        第二个参数 1 表示从 newIndex 位置删除一个元素。
        第三个参数 this.config[oldIndex] 是要插入的新元素，即当前位于 oldIndex 位置的元素。
        这个操作会从 this.config 数组的 newIndex 位置删除一个元素，并立即在相同的位置插入 this.config[oldIndex] 元素。
        splice() 方法返回一个包含被删除的元素的数组。
      2. [0]:
        因为 splice() 返回的是一个数组，这里的 [0] 是用来获取这个数组中的第一个元素，即原 newIndex 位置上的元素。
      3. this.config[oldIndex] = ...:
        最后，把从 newIndex 位置删除的元素赋值给原来的 oldIndex 位置。
        这完成了两个元素位置的互换。
      * */
      this.questions[oldIndex] = this.questions.splice(
        newIndex,
        1,
        this.questions[oldIndex]
      )[0];

      this.surveySort();
    },
    // 问卷排序
    surveySort() {
      this.questions.forEach((item, index) => {
        item["sortNum"] = index + 1;
      });

      this.$store.dispatch("survey/updateQuestion", this.questions);
    },
    // 跳转
    scrollToElement(id) {
      const element = document.getElementById(id);
      console.log(element, "element");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    // 点击外部
    clickOutSide(index, status) {
      index == this.activeQuestion && !status ? this.confirmOptions() : "";
    },
    // 处理方法
    handleAction(fun, index) {
      this[fun](index);
    },
    // 复制
    copyQuestion(index) {
      const question = this.questions[index];
      // 有选项
      if (question.options.length) {
        const options = question.options.map((item) => {
          return { ...item, qId: null, rId: null };
        });
        this.questions.splice(index++, 0, { ...question, options, qId: null });
      } else {
        this.questions.splice(index++, 0, { ...question, qId: null });
      }

      // 问卷排序
      this.surveySort();
    },
    // 编辑选项
    saveOptions(index) {
      this.confirmOptions();
      this.activeQuestion = index;
    },
    // 确认选项
    confirmOptions() {
      if (this.activeQuestion === "") return;

      const options = this.questions[this.activeQuestion].options.filter(
        (opt) => opt.optionName !== ""
      );
      this.questions[this.activeQuestion].options = options;

      this.$store.dispatch("survey/updateQuestion", this.questions);

      this.activeQuestion = "";
    },
    // 删除
    removeQuestion(index) {
      const question = this.questions[index];

      this.$confirm(`是否删除${question.qTitle}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.skipRelative.includes(question.qId)) {
            this.$message.error("已关联跳转，不可删除");
          } else {
            this.questions.splice(index, 1);
            this.surveySort();
            this.$message.success("删除成功");
          }
        })
        .catch(() => this.$message.warning("取消删除"));
    },
    // 跳题
    skipToQuestion(qId, toId) {
      // 根据qId 和 toId 获取到需要设置为空的项目
      const start = this.questions.findIndex((item) => item.qId === qId);
      const end = this.questions.findIndex((item) => item.qId === toId);

      // 提取 qId 之前的项，不改动
      this.showQuestion = this.showQuestion
        .slice(0, start + 1)
        // 获取 toId 之后的项, 并合并数组
        .concat(this.questions.slice(end));
    },
  },
  mounted() {
    this.$EventBus.$on("scroll-to-element", this.scrollToElement);
    this.$EventBus.$on("skip-to-question", this.skipToQuestion);
    this.$EventBus.$on("save-answer",() => {
      console.log(this.formData);
    });
  },
  destroyed() {
    this.$EventBus.$off("scroll-to-element", this.scrollToElement);
    this.$EventBus.$off("skip-to-question", this.skipToQuestion);
    this.$EventBus.$off("save-answer");
  },
  watch: {
    questions(newValue) {
      this.showQuestion = newValue
    }
  }
};
</script>

<style scoped lang="scss">
/* 拖拽元素被选中时 */
.chosen {
  border: 2px dashed #fc715b;
  opacity: 0.8;
}
/* 拖拽后留在原地的元素 */
.ghost {
  opacity: 0.5;
  border: 2px solid #fc715b;
  background-color: #ffffff;
}
/* 拖拽时跟随鼠标的元素 */
.dragging {
  border-color: #fc715b;
  background-color: #fc715b;
  color: #ffffff;
}
</style>
