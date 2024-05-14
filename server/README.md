server
│
├── node_modules/ # Node模块存放的文件夹
│
├── src/ # 所有源代码存放的目录
│ ├── config/ # 配置文件目录
│ │ └── dbConfig.js # 数据库连接配置
│ │
│ ├── models/ # 数据模型(Model)目录
│ │ └── User.js # 用户模型文件
│ │
│ ├── routes/ # 路由文件目录
│ │ └── userRoutes.js # 用户路由文件
│ │
│ ├── services/ # 服务层目录
│ │ └── userService.js # 用户相关的业务逻辑
│ │
│ └── app.js # 应用的入口文件
│
├── sql/ # 存放SQL脚本的目录
│ └── setup.sql # 数据库建表等初始化SQL脚本
│
├── .gitignore # 指定不提交到Git版本控制的文件
├── package.json # 项目描述和依赖信息
└── README.md # 项目的README文件
