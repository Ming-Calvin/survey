import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import survey from "./modules/survey";
import loading from "./modules/loading";

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    survey,
    loading,
  },
  getters,
});

export default store;
