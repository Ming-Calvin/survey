// 服务层文件，处理更复杂的业务逻辑，通常从User.js模型调用数据库操作
const Survey = require('../models/Survey');

class SurveyService {
  static getAllSurveys(surveyId) {
    return Survey.getAllSurveys(surveyId);
  }

  static addSurvey(id, title, note) {
    return Survey.addSurvey(id, title, note);
  }

  static addQuestions(qId, sId, qTitle, qType, sortNum) {
    return Survey.addQuestions(qId, sId, qTitle, qType, sortNum);
  }

  static getQuestionsBySurveyId(qId) {
    return Survey.getQuestionsBySurveyId(qId);
  }

  static updateQuestion(qId, sId, qTitle, qType, sortNum, toId) {
    return Survey.updateQuestion(qId, sId, qTitle, qType, sortNum, toId);
  }

  static deleteQuestions(questionIds) {
    return Survey.deleteQuestions(questionIds);
  }

  static addOption(rId, optionName, qId, sortNum, toId) {
    return Survey.addOption(rId, optionName, qId, sortNum, toId);
  }

  static deleteOptionsByQuestionId(qId) {
    return Survey.deleteOptionsByQuestionId(qId);
  }

  static getSurveyList(limit, offset) {
    return Survey.getSurveyList(limit, offset);
  }
}

module.exports = SurveyService;
