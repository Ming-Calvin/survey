# survey后端

## 1. app.js

### 导入依赖

```javascript
const express = require('express');
const userRoutes = require('./routes/userRoutes');
```

这两行代码导入了所需的依赖：

- `express`：这是Node.js的一个框架，用于建立web服务器和处理HTTP请求。
- `userRoutes`：这是从项目的`./routes/userRoutes`模块导入的路由，通常这个模块包含了一组相关的路由，这里假设是处理与用户相关的操作（如创建用户、获取用户列表等）。

### 初始化Express应用

```javascript
const app = express();
```

这行代码通过调用`express`函数来创建一个Express应用实例。这个实例`app`将被用来配置中间件、路由和启动服务器。

### 配置中间件

```javascript
// 解析 application/json
app.use(express.json());
```

这行代码添加了一个中间件，通过`express.json()`来解析客户端发送的JSON格式的请求体。这对于接收JSON格式的数据（例如，通过POST请求发送的用户数据）是必需的。

### 使用路由

```javascript
app.use('/api', userRoutes);
```

这行代码配置了应用使用的路由。这里，`userRoutes`包含了一组路由，它们现在都将被挂载到`/api`这个基础路径下。这意味着`userRoutes`模块中的所有路由现在都会前缀`/api`，例如，如果`userRoutes`中有一个路由定义为`/users`，那么完整的访问路径将是`/api/users`。

### 启动服务器

```javascript
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

- `const port = 3000;`：这行代码设置服务器监听的端口号为3000。
- `app.listen(port, ...)`：这个方法启动了一个HTTP服务器，并监听指定的端口（3000）。当服务器成功启动并开始监听请求时，将调用提供的回调函数，并打印一条消息到控制台，表明服务器已经在`http://localhost:3000`上运行。

## 2. dbConfig.js

### 导入依赖

```javascript
const mysql = require('mysql2');
```

这行代码导入了`mysql2`库，`mysql2`是一个流行的MySQL客户端库，提供了与MySQL数据库交互的接口。它与原始的`mysql`库接口兼容，同时提供了更多的功能和改进，如Promise支持。

### 创建数据库连接池

```javascript
const dbConfig = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'survey',
});
```

这里通过`mysql.createPool()`方法创建了一个数据库连接池。连接池是一种创建和管理数据库连接的技术，可以提高数据库操作的性能，因为它减少了频繁创建和销毁连接的开销。`createPool()`方法接受一个配置对象，其中包括：

- `host`: 数据库服务器的主机名，这里是`localhost`，表示数据库服务器在本地运行。
- `user`: 用于登录数据库的用户名，这里是`root`。
- `password`: 对应用户的密码，这里是`root`。
- `database`: 要连接的数据库名称，这里是`survey`。

### 使用Promise API

```javascript
module.exports = dbConfig.promise();
```

这行代码调用了`dbConfig.promise()`方法，该方法是`mysql2`库提供的，用来启用Promise API。这使得你可以使用Promise而不是传统的回调函数来处理异步数据库操作。这对于使用现代JavaScript异步特性（如`async/await`）编写代码非常有用。

通过将Promise版本的`dbConfig`导出，你可以在其他文件中通过`require`引入并使用这个配置的连接池，来执行数据库查询，并以Promise的方式处理结果。

## 3. User.js

这段代码定义了一个名为 `User` 的类，该类中包含了两个静态方法：`getAllUsers` 和 `addUser`，这两个方法用于执行数据库操作。这里使用了 `mysql2` 的 Promise API 来处理数据库查询。具体分析如下：

### 导入数据库配置

```javascript
const db = require('../config/dbConfig');
```

这行代码导入了前面配置的数据库连接池（即使用Promise API的版本）。这个连接池实例 `db` 会在类的方法中使用，以执行数据库查询。

### 定义 User 类

```javascript
class User {
```

这里定义了一个名为 `User` 的类，类中定义的方法都是静态的，意味着你可以直接通过类名调用这些方法，而不需要实例化类对象。

#### 获取所有用户

```javascript
  static getAllUsers() {
    return db.query('SELECT * FROM users');
  }
```

`getAllUsers` 方法使用了数据库连接池的 `query` 方法来执行一个SQL查询，该查询获取 `users` 表中的所有记录。由于使用了Promise API，`db.query` 将返回一个Promise，该Promise在解析时包含查询的结果。

#### 添加用户

```javascript
  static addUser(name, age) {
    return db.query('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
  }
```

`addUser` 方法执行一个参数化的SQL插入语句，向 `users` 表中添加一条新记录。此方法接受两个参数：`name` 和 `age`，这两个参数被传递到SQL语句中，从而避免了SQL注入的风险。和 `getAllUsers` 方法一样，这个方法返回一个Promise，该Promise在解析时表示插入操作的完成状态。

### 模块导出

```javascript
module.exports = User;
```

最后，这行代码导出 `User` 类，使得其他文件可以通过 `require` 引入并使用这个类及其方法。例如，在API路由处理函数中，你可以使用 `User.getAllUsers()` 或 `User.addUser()` 来与数据库交互。

## 4. userService.js

### 导入 User 类

```javascript
const User = require('../models/User');
```

这行代码导入了 `User` 类，该类定义在项目的 `models` 目录下。`User` 类提供了与 `users` 数据库表相关的操作方法。通过将这些方法封装在模型类中，你可以在整个应用中重用这些方法，同时保持业务逻辑与数据访问逻辑的解耦。

### 定义 UserService 类

```javascript
class UserService {
```

在这里定义了一个名为 `UserService` 的类，该类中的方法都是静态的。静态方法意味着它们可以直接通过类名调用，而无需创建类的实例。

#### 获取所有用户

```javascript
  static getAllUsers() {
    return User.getAllUsers();
  }
```

`getAllUsers` 方法在 `UserService` 类中简单地调用了 `User` 类中的 `getAllUsers` 方法。这种方法的调用通常发生在控制器层，用于处理API请求。它返回一个Promise，该Promise在解析时包含从数据库检索到的所有用户数据。

#### 添加用户

```javascript
  static addUser(name, age) {
    return User.addUser(name, age);
  }
```

`addUser` 方法在 `UserService` 类中调用 `User` 类的 `addUser` 方法，传递 `name` 和 `age` 两个参数。这个方法用于将新用户数据插入数据库，同样返回一个Promise，表示插入操作的完成状态。

### 模块导出

```javascript
module.exports = UserService;
```

这行代码导出 `UserService` 类，使得其他文件可以通过 `require` 引入并使用这个类的方法。通过这种方式，控制器可以通过服务层与数据模型交互，而不是直接从控制器访问数据库模型，这有助于保持代码的整洁和模块化。

## 5. userRoutes.js

### 导入依赖

```javascript
const express = require('express');
const userService = require('../services/userService');
const router = express.Router();
```

- **express**: 导入Express库，这是Node.js的一个框架，用于建立web服务器和处理HTTP请求。
- **userService**: 导入`userService`模块，该模块封装了与用户相关的业务逻辑，如从数据库获取所有用户或添加新用户。
- **router**: 创建一个新的Express Router实例，用于定义与用户相关的路由。

### 定义 GET 路由

```javascript
router.get('/users', async (req, res) => {
  try {
    const [users] = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

- 当接收到对`/users`路径的GET请求时，此路由将被触发。
- 使用`async`关键字标记的异步函数处理请求。
- `userService.getAllUsers()`调用返回所有用户的数据。此函数返回一个Promise，通过`await`等待其解决。
- 将返回的用户数据（`users`）发送回客户端作为JSON响应。
- 如果在处理过程中发生异常，将捕获错误并返回状态码500（服务器内部错误），同时发送包含错误信息的JSON。

### 定义 POST 路由

```javascript
router.post('/users', async (req, res) => {
  try {
    const { name, age } = req.body;
    const [result] = await userService.addUser(name, age);
    res.status(201).json({ message: 'User added', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

- 当接收到对`/users`路径的POST请求时，此路由将被触发。
- 从请求体中提取`name`和`age`数据。
- `userService.addUser(name, age)`调用将新用户数据添加到数据库。此函数也返回一个Promise，通过`await`等待其解决。
- 响应状态码201（已创建）表示用户已成功添加。
- 如果在处理过程中发生异常，同样捕获错误并返回状态码500，同时发送包含错误信息的JSON。

### 导出路由模块

```javascript
module.exports = router;
```

- 导出路由实例，使其可以在其他部分的Express应用中使用，通常是在主应用文件中被挂载到特定的基础路径上。
