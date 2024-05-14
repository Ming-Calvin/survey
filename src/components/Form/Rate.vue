<template>
  <div style="padding: 30px 0">
    <template v-if="!isEditable">
      <div class="rate-title">
        <div>非常不满意</div>
        <div>非常满意</div>
      </div>

      <ul class="scale-rating">
        <li
          v-for="(item, index) in sore"
          :key="index"
          :class="[
            internalValue === item ? 'active' : '',
            disabled ? 'disabled' : '',
          ]"
          @click="changeRate(item)"
        >
          {{ item }}
        </li>
      </ul>
    </template>

    <template v-else>
      <span style="color: #a8a8a8">最大评分：</span>

      <el-input-number
        placeholder="请输入最大评分"
        v-model="sore"
        controls-position="right"
        :min="1"
        :max="10"
      >
      </el-input-number>
    </template>
  </div>
</template>

<script>
export default {
  name: "Rate",
  props: ["data", "question", "disabled", "isEditable"],
  data() {
    return {
      internalValue: this.data,
      sore: 5,
    };
  },
  methods: {
    changeRate(id) {
      if (this.disabled) return;
      this.internalValue = id;
    },
  },
  watch: {
    internalValue(newValue) {
      this.$emit("update:data", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/base";

.rate-title {
  @include flex;
  @include flex-j-a(space-between, center);
}

.scale-rating {
  @include flex;
  @include flex-j-a(space-around, center);
  border-top: 1px solid #e3e3e3;
  padding: 10px 0;

  li {
    border-radius: 30px;
    color: #595959;
    border: 1px solid #a6a6a6;
    width: 20px;
    height: 20px;
    line-height: 18px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    background-color: #ffffff;
  }

  li.active {
    border-color: #fc4e33;
    color: #fc4e33;
  }

  li.disabled {
    cursor: not-allowed;
  }
}
</style>
