import { local } from "@/utils/cache";
import { getSurveys, saveSurvey } from "@/api/survey";

let modules = {
  // 封装到命名空间,允许设置重复的方法
  namespaced: true,
  state: {
    survey: local.get("survey") || {},
    questions: local.get("questions") || [],
    userName: local.get("userName") || {},
    skip: local.get("skip") || {},
    publish: {},
  },

  // 改变状态的唯一方法，必须是同步函数
  mutations: {
    SET_USERNAME(state, userName) {
      local.set("userName", userName);
      state.userName = userName;
    },
    SET_PUBLISH(state, publish) {
      state.publish = publish;
    },
    REMOVE_PUBLISH(state) {
      state.publish = {};
      local.remove("publish");
    },
    SET_SURVEY(state, survey) {
      local.set("survey", survey);
      state.survey = survey;
    },
    SET_QUERSTON(state, questions) {
      local.set("questions", questions);
      state.questions = questions;
    },
    UPDATE_QUESTION(state, data) {
      state.questions = data;
      local.set("questions", state.questions);
    },
    REMOVE_QUESTION(state) {
      local.remove("questions");
      state.skip = {};
    },
    UPDATE_SURVEY(state, data) {
      const survey = local.get("survey") || {};
      state.survey = Object.assign({}, survey, data);
      local.set("survey", Object.assign({}, survey, data));
    },
    REMOVE_SURVEY(state) {
      local.remove("survey");
      state.survey = {};
    },
  },

  actions: {
    // 新建问卷
    // buildBySurvey({ commit }, data) {
    //   return new Promise(resolve => {
    //     saveSurveyAction(data).then(res => {
    //       commit('SET_SURVEY', res.data)
    //       resolve(res.data)
    //     })
    //   })
    // }

    // 预览问卷
    getSurvey({ commit }, id) {
      return new Promise((resolve) => {
        getSurveys(id).then((res) => {
          commit("SET_SURVEY", res.data);
          commit("SET_QUERSTON", res.data.questions);
          resolve(res.data);
        });
      });
    },
    // 更新题型
    updateQuestion({ commit }, data) {
      commit("UPDATE_QUESTION", data);
    },
    // 更新问卷
    async updateSurvey({ commit }, data) {
      const { id } = data;

      await saveSurvey(data);
      return new Promise((resolve) => {
        getSurveys({ id }).then((res) => {
          commit("SET_SURVEY", res.data);
          commit("SET_QUERSTON", res.data.questions);
          resolve(res.data);
        });
      });
    },
  },
};

export default modules;
