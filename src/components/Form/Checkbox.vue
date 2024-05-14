<template>
  <el-checkbox-group v-model="internalValue" v-bind="$attrs">
    <template v-if="!isEditable">
      <el-checkbox
        v-for="(item, index) in question.options"
        :key="index + item.rId"
        :label="item.rId"
      >
        {{ item.optionName }}
      </el-checkbox>
    </template>

    <template v-else>
      <el-checkbox
        v-for="(item, index) in question.options"
        :key="index + item.rId"
        :label="item.rId"
      >
        <el-input v-model="item.optionName" placeholder="请输入内容"></el-input>

        <edit-controls
          :options.sync="question.options"
          :index="index"
          :defaultOptions="defaultOptions"
        ></edit-controls>
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
export default {
  name: "Checkbox",
  props: ["data", "question", "isEditable"],
  data() {
    return {
      internalValue: this.data || [],
      defaultOptions: { rId: null, optionName: "" },
    };
  },
  watch: {
    internalValue(newValue) {
      this.$emit("update:data", newValue);
    },
  },
};
</script>

<style scoped lang="scss"></style>
