// 应用程序的主入口文件，负责初始化Express应用，加载中间件、路由等

const express = require('express');
const surveyRoutes = require('./routes/suveyRoutes');

const app = express();

// 解析 application/json
app.use(express.json());
// 解析 urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api', surveyRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
