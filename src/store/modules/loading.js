let modules = {
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
  },
};

export default modules;
