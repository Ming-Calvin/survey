<template>
  <div>
    <el-row
      v-for="(item, index) in question.options"
      :key="index"
      class="multi-blank"
      :gutter="14"
    >
      <template v-if="!isEditable">
        <el-col :span="6">
          <div>{{ fieldLabel(item, index) }}</div>
        </el-col>

        <el-col :span="18">
          <el-input placeholder="请输入答案" v-model="data" v-bind="$attrs">
          </el-input>
        </el-col>
      </template>

      <template v-else>
        <span> {{ index + 1 }}、 </span>
        <el-input
          class="edit"
          v-model="item.optionName"
          placeholder="请输入内容"
        ></el-input>

        <edit-controls
          :options.sync="question.options"
          :index="index"
          :defaultOptions="defaultOptions"
        ></edit-controls>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MultiBlank",
  props: ["data", "question", "isEditable"],
  data() {
    return {
      internalValue: this.data || [],
      defaultOptions: { rId: null, optionName: "" },
    };
  },
  computed: {
    fieldLabel: function () {
      return (item, index) => {
        return `${index + 1}、${item.optionName}`;
      };
    },
  },
  watch: {
    internalValue(newValue) {
      this.$emit("update:data", newValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/style/base";

.multi-blank {
  @include flex;
  @include flex-j-a(center, center);
  line-height: 20px;

  .edit {
    width: 90%;
    margin: 15px 20px 15px 0;
  }
}
</style>
