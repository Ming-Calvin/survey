<!-- 表格组件 -->
<template>
  <el-table ref="table" :data="tableData" :loading="loading" stripe>
    <template v-for="item in tableConfig">
      <!--插槽-->
      <el-table-column
        :label="item.label"
        :width="item.width"
        :key="item.prop"
        :fixed="item.fixed"
        :class-name="item.class"
      >
        <template slot-scope="scope">
          <!-- 序号 -->
          <template v-if="item.type === 'index'">
            {{ scope.$index + 1 }}
          </template>

          <!-- 时间  -->
          <template v-else-if="item.type === 'time'">
            {{ transferTime(scope.row[item.prop]) }}
          </template>

          <!-- 操作 -->
          <template v-else-if="item.type == 'operate'" class="buttonList">
            <el-button
              v-for="(item, index) in item.operate"
              type="text"
              :key="index"
              @click="onBtnClick(item.function, scope.row)"
            >
              {{ item.label }}
            </el-button>
          </template>

          <slot
            v-else-if="item.slotName"
            :name="item.slotName"
            :row="scope.row[item.prop]"
          ></slot>

          <template v-else>
            {{ scope.row[item.prop] }}
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { deepClone } from "@/utils";

export default {
  name: "CustomTable",
  data() {
    return {
      // 表格配置
      tableConfig: [],
    };
  },
  props: {
    // 表单数据
    data: {
      default: () => [],
      type: Array,
    },
    // 是否loading
    loading: {
      default: false,
      type: Boolean,
    },
    // 表格配置规则
    config: {
      default: () => [],
      type: Array,
    },
  },
  computed: {
    tableData: {
      get: function () {
        return this.data;
      },
      set: function (v) {
        this.$emit("update:data", v);
      },
    },
  },
  watch: {
    config: {
      handler(value) {
        this.tableConfig = deepClone(value);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 转换时间显示
    transferTime(val) {
      return this.$moment(val).format("YYYY-MM-DD");
    },
    // 按钮点击事件
    onBtnClick(fun, row) {
      this.$emit(fun, row)
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/style/index";

::v-deep .operate {
  .cell {
    @include flex-j-a(space-between, center);
    padding: 0;

    .el-button--text {
      min-width: 0;
    }
  }
}
</style>
