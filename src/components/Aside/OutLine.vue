<template>
  <div>
    <div
      v-for="(item, index) in questions"
      :key="index"
      class="outline"
      @click="scrollToElement(item.sortNum)"
    >
      {{ item.sortNum }}、{{ item.qTitle }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AsideOutLine",
  data() {
    return {};
  },
  computed: {
    ...mapState("survey", {
      questions: (state) => state.questions,
    }),
  },
  methods: {
    scrollToElement(id) {
      this.$EventBus.$emit("scroll-to-element", id);
    },
  },
};
</script>

<style scoped lang="scss">
.outline {
  line-height: 20px;
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f2;

  &:hover {
    color: #f48d80;
  }
}
</style>
