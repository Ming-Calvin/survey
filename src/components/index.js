// 注册全局组件
import Vue from "vue";
import Header from "@/components/Header/index.vue";
import Aside from "@/components/Aside/index.vue";
import Main from "@/components/Main/index.vue";
import Radio from "@/components/Form/Radio.vue";
import Checkbox from "@/components/Form/Checkbox.vue";
import Blank from "@/components/Form/Blank.vue";
import NumberBlank from "@/components/Form/NumberBlank.vue";
import MultiBlank from "@/components/Form/MultiBlank.vue";
import File from "@/components/Form/File.vue";
import Rate from "@/components/Form/Rate.vue";
import EditControls from "@/components/Form/EditControls.vue";
import QuestionTitle from "@/components/Form/Title.vue";
import SkipQuestion from "@/components/Form/skipQuestion.vue";
import CustomTable from "@/components/Table/index.vue";
import TableCard from "@/components/Table/TableCard.vue";

const globalComponents = [
  Header,
  Aside,
  Main,
  Radio,
  Checkbox,
  Blank,
  NumberBlank,
  MultiBlank,
  File,
  Rate,
  EditControls,
  QuestionTitle,
  SkipQuestion,
  CustomTable,
  TableCard,
];

globalComponents.forEach((ele) => {
  Vue.component(`${ele.name}`, ele);
});
