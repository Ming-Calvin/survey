export const mySurveyListOption = [
  {
    label: "序号",
    prop: "index",
    type: "index",
  },
  {
    label: "标题",
    prop: "title",
  },
  {
    label: "创建时间",
    prop: "createTime",
    type: "time",
  },
  {
    label: "状态",
    prop: "status",
    slotName: "status",
  },
  {
    label: "发布",
    prop: "published",
    slotName: "published",
  },
  {
    label: "操作",
    prop: "operate",
    type: "operate",
    width: "350",
    class: "operate",
    operate: [
      {
        label: "编辑",
        function: "editSurvey",
      },
      {
        label: "发布",
        function: "published",
      },
      {
        label: "预览",
        function: "preview"
      },
      {
        label: "复制问卷",
        function: "copyQuestion",
      },
      {
        label: "删除",
        function: "deleteSurvey"
      },
    ],
  },
];
