// 数据模型文件，定义了用户表的结构以及与用户相关的数据库操作
const db = require('../config/dbConfig');

class Survey {
  // 获取问卷
  static getAllSurveys(surveyId) {
    const SQL = `
      SELECT
          s.id,
          s.title,
          s.note,
          s.type,
          s.userName,
          s.createTime,
          q.qId,
          q.qTitle,
          q.qType,
          q.sortNum as questionSortNum,
          q.toId as questionToId,
          o.rId,
          o.optionName,
          o.toId as optionToId,
          o.sortNum as optionSortNum
      FROM Survey s
      LEFT JOIN Questions q ON s.id = q.sId
      LEFT JOIN Options o ON q.qId = o.qId
      WHERE s.id = ?
      ORDER BY q.sortNum, o.sortNum
      `;

    return db.query(SQL, [surveyId]);
  }

  // 添加问卷
  static addSurvey(id, title, note) {
    const userName = '王莉';
    const userId = 'wangli_1';
    const type = 0;

    return db.query(
      `INSERT INTO Survey (id, title, note, type, userName, userId) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, title, note, type, userName, userId]
    );
  }

  // 添加问题
  static addQuestions(qId, sId, qTitle, qType, sortNum) {
    return db.query(
      `INSERT INTO Questions (qId, sId, qTitle, qType, sortNum) VALUES (?, ?, ?, ?, ?)`,
      [qId, sId, qTitle, qType, sortNum]
    );
  }

  // 获取问卷所有的问题id
  static getQuestionsBySurveyId(surveyId) {
    const SQL = `SELECT qId FROM Questions WHERE sId = ?`;
    return db.query(SQL, [surveyId]);
  }

  // 更新问题
  static updateQuestion(qId, sId, qTitle, qType, sortNum, toId) {
    const SQL = `
      UPDATE Questions SET qTitle = ?, qType = ?, sortNum = ? WHERE qId = ? AND sId = ? And toId = ?
    `;
    return db.query(SQL, [qTitle, qType, sortNum, qId, sId, toId]);
  }

  // 删除问题
  static deleteQuestions(questionIds) {
    // 写占位符
    const placeholders = questionIds.map(() => '?').join(',');
    const SQL = `
      DELETE FROM Questions WHERE qId IN (${placeholders})
    `;
    return db.query(SQL, questionIds);
  }

  // 添加选项
  static addOption(rId, optionName, qId, sortNum, toId) {
    const SQL = `INSERT INTO Options (rId, optionName, qId, sortNum, answers, toId) VALUES (?, ?, ?, ?, ?, ?)`;
    return db.query(SQL, [rId, optionName, qId, sortNum, 'xx', toId]);
  }

  // 删除特定问题的所有选项
  static deleteOptionsByQuestionId(qId) {
    const SQL = `DELETE FROM Options Where qId = ?`
    return db.query(SQL, [qId])
  }
}

module.exports = Survey;
