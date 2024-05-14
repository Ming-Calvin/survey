// 文件包含数据库连接的配置信息，如数据库服务器地址、用户名、密码等
const mysql = require('mysql2');

// 数据库配置
const dbConfig = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'survey',
});

// 使用Promise API
module.exports = dbConfig.promise();
