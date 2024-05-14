// 路由文件，定义了关于用户操作的HTTP路由，如获取用户列表、添加新用户等
const express = require('express');
const surveyService = require('../services/surveyService');
const router = express.Router();
const uuid = require('uuid');

router.get('/getSurveys', async (req, res) => {
  const surveyId = req.query.id;

  try {
    const [rows] = await surveyService.getAllSurveys(surveyId);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    // 构建响应对象，包含问卷信息和问题列表
    const survey = {
      id: rows[0].id,
      title: rows[0].title,
      note: rows[0].note,
      type: rows[0].type,
      userName: rows[0].userName,
      createTime: rows[0].createTime,
      questions: [],
    };

    // 使用一个 Mao 来整理问题和他们的选项
    const questionsMap = new Map();
    rows.forEach((row) => {
      if (row.qId && !questionsMap.has(row.qId)) {
        console.log(row, 'toId: row.toId,');
        questionsMap.set(row.qId, {
          qId: row.qId,
          qTitle: row.qTitle,
          qType: row.qType,
          sortNum: row.questionSortNum,
          toId: row.questionToId,
          options: [],
        });
      }

      if (row.rId) {
        questionsMap.get(row.qId).options.push({
          rId: row.rId,
          optionName: row.optionName,
          toId: row.optionToId,
          sortNum: row.optionSortNum,
        });
      }
    });

    // 添加整理后端问题到问卷对象
    survey.questions = Array.from(questionsMap.values());

    res.status(200).json({ code: 200, data: survey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/addSurvey', async (req, res) => {
  try {
    const { title, note } = req.body;
    const id = uuid.v4();

    const [result] = await surveyService.addSurvey(id, title, note);
    res.status(201).json({ message: 'User addSurvey', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/saveQuestions', async (req, res) => {
  try {
    const { id: surveyId, questions } = req.body;

    // 获取数据库中当前问卷的所有问题
    const [existingQuestions] = await surveyService.getQuestionsBySurveyId(surveyId);
    const existingQuestionIds = existingQuestions.map((q) => q.qId);

    // 提交的问题ID集合(使用filter 过滤为0、null、undefined、‘’，false、NaN 的项)
    const submittedQuestionIds = questions.map((q) => q.qId).filter((id) => id);

    // 需要删除的问题ID
    const questionsToDelete = existingQuestionIds.filter(
      (id) => !submittedQuestionIds.includes(id)
    );

    // 删除不再包含的问题
    if (questionsToDelete.length > 0) {
      console.log(questionsToDelete, 'questionsToDelete');
      await surveyService.deleteQuestions(questionsToDelete);
    }

    // 处理提交的问题
    const operations = questions.map(async (question) => {
      const { qTitle, qType, options, sortNum, toId } = question;
      let { qId } = question

      // 更新或添加问题
      if (existingQuestionIds.includes(qId)) {
        console.log('update');
        await surveyService.updateQuestion(
          qId,
          surveyId,
          qTitle,
          qType,
          sortNum,
          toId
        );

      } else {
        qId = uuid.v4()

        console.log('add');
        await surveyService.addQuestions(
          qId,
          surveyId,
          qTitle,
          qType,
          sortNum
        );
      }

      // 删除问题的所有选项
      await surveyService.deleteOptionsByQuestionId(qId)

      // 添加更新选项
      await Promise.all(
        options.map(({ optionName, sortNum, toId }) => {
          return surveyService.addOption(uuid.v4(), optionName, qId, sortNum, toId);
        })
      );
    });

    await Promise.all(operations);
    res.status(201).json({ message: 'User addSurvey' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
