import config from "@/request/config";
import request from "@/request/request";

// 获取问卷
export function getSurveys(params) {
  return request({
    method: "get",
    url: config.baseUrl + "/api/getSurveys",
    params,
  });
}

// 添加问卷
export function addSurvey(data) {
  return request({
    method: "post",
    url: config.baseUrl + "/api/addSurvey",
    data,
  });
}

// 更新问卷
export function saveSurvey(data) {
  return request({
    method: "post",
    url: config.baseUrl + "/api/saveQuestions",
    data,
  });
}
