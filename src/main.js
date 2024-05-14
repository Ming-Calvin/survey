import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 时间格式化组件
import moment from "moment";

// 完整引入 Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入自定义指令
import "./utils/directive";
// 引用全局样式
import "./style/index.scss";
// 引入全局组件
import "@/components/index";

// 时间化组件
Vue.prototype.$moment = moment;
// 全局事件总线
Vue.prototype.$EventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
