function questionModel(sortNum) {
  return {
    Radio: {
      qTitle: "单选题",
      qType: "radio",
      sortNum: sortNum,
      qId: "",
      options: [
        {
          rId: "",
          optionName: "选项1",
          sortNum: 1,
        },
        {
          rId: "",
          optionName: "选项2",
          sortNum: 2,
        },
      ],
    },
    CheckBok: {
      qTitle: "多选题",
      qType: "checkbox",
      sortNum: sortNum,
      qId: "",
      options: [
        {
          rId: "",
          optionName: "选项1",
          sortNum: 1,
        },
        {
          rId: "",
          optionName: "选项2",
          sortNum: 2,
        },
      ],
    },
    Blank: {
      qTitle: "填空题",
      qType: "Blank",
      sortNum: sortNum,
      qId: "",
      qExplain: "请输入您的答案",
      options: [
        {
          rId: "",
          optionName: "请输入您的答案",
          sortNum: 1,
        },
      ],
    },
    NumberBlank: {
      qTitle: "填空题（数字）",
      qType: "NumberBlank",
      sortNum: sortNum,
      qId: "",
      qExplain: "请输入您的答案",
      options: [
        {
          rId: "",
          optionName: "请输入您的答案",
          sortNum: 1,
        },
      ],
    },
    MultiBlank: {
      qTitle: "填空题（多选）",
      qType: "MultiBlank",
      sortNum: sortNum,
      qId: "",
      qExplain: "请输入您的答案",
      options: [
        {
          rId: "",
          optionName: "请输入您的答案",
          sortNum: 1,
        },
      ],
    },
    File: {
      qTitle: "图片上传",
      qType: "File",
      sortNum: sortNum,
      qId: "",
      options: [
        {
          rId: "",
          optionName: "选择文件（不超过4M）",
          sortNum: 1,
        },
      ],
    },
    Rate: {
      qTitle: "评分",
      qType: "Rate",
      sortNum: sortNum,
      qId: "",
      options: [
        {
          rId: "",
          optionName: "请输入最大评分",
          sortNum: 1,
        },
      ],
    },
  };
}

export default questionModel;
