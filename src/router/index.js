import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 主页
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/survey",
    name: "Survey",
    component: () => import("../views/survey.vue"),
  },
  {
    path: "/preview",
    name: "Preview",
    component: () => import("../views/preview.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
