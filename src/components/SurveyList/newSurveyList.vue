<template>
  <div class="main">
    <TableCard class="card" style="margin-bottom: 20px">
      <template #content>
        <div class="header">
          <div class="titleSearch">
            <div style="width: 200px">标题搜索：</div>
            <el-input v-model="title" placeholder="请输入标题"></el-input>
            <el-button type="danger"> 查询 </el-button>
          </div>

          <div class="addButton">
            <el-button type="danger" icon="el-icon-plus"> 选择模板 </el-button>
            <el-button type="danger" icon="el-icon-plus"> 新建问卷 </el-button>
          </div>
        </div>
      </template>
    </TableCard>

    <TableCard class="card" style="height: 100%">
      <template #content>
        <CustomTable
          ref="table"
          :config="formConfig"
          :data="formData"
          :loading="loading"
          @editSurvey="editSurvey"
          @published="published"
          @preview="preview"
          @copyQuestion="copyQuestion"
          @deleteSurvey="deleteSurvey"
        >
          <template #status="{ row }">
            <el-tag type="danger" v-if="row == 1"> 正常 </el-tag>
            <el-tag type="info" v-else-if="row == 2"> 废弃 </el-tag>
          </template>

          <template #published="{ row }">
            <el-tag type="danger" v-if="row == 0"> 未发布 </el-tag>
            <el-tag type="info" v-else-if="row == 1"> 已发布 </el-tag>
          </template>
        </CustomTable>
      </template>
    </TableCard>
  </div>
</template>

<script>
import { mySurveyListOption } from "@/components/SurveyList/surveyTableOptions";
import { getSurveyList } from "@/api/survey";

export default {
  name: "newSurveyList",
  data() {
    return {
      // 表单数据
      formData: [],
      // 表单配置
      formConfig: mySurveyListOption,
      // 缓冲
      loading: false,
      // 标题
      title: "",
    };
  },
  methods: {
    getSurveyList() {
      getSurveyList().then((res) => {
        this.formData = res.data;
      });
    },
    // 编辑
    editSurvey(row) {
      this.$router.push({
        path: "/survey?edit=true",
        query: { id: row.id }
      })
    },
    // 发布
    published(row) {
      console.log(row, '发布');
    },
    // 预览
    preview(row) {
      console.log(row, '预览');
    },
    // 复制问卷
    copyQuestion(row) {
      console.log(row, '复制');
    },
    // 删除
    deleteSurvey(row) {
      console.log(row, '删除');
    }
  },
  created() {
    // 获取问卷
    this.getSurveyList();
  },
};
</script>

<style scoped lang="scss">
@import "@/style/index";

.main {
  @include flex-j-a(start, start);
  flex-direction: column;

  .card {
    width: 100%;
  }
}

.header {
  @include flex-j-a(space-between, center);

  .titleSearch {
    @include flex-j-a(start, center);

    .el-input {
      margin: 0 20px 0 0;
    }
  }
}
</style>
