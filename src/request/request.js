import axios from "axios";
import store from "@/store";
import errorCode from "@/utils/errorCode";

axios.defaults.headers["Content-Type"] = "application/json";

const service = axios.create({
  timeout: 1000000,
});

let loadingCount = 0;

const showLoading = () => {
  loadingCount++;
  store.commit("SET_LOADING", true);
};

const hideLoading = () => {
  loadingCount--;
  if (loadingCount == 0) store.commit("SET_LOADING", false);
};

service.interceptors.request.use(
  (config) => {
    showLoading();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    const code = res.data.code || 200;
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    hideLoading();

    if (code !== 200) console.log(msg);
    return res.data;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

export default service;
