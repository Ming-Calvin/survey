-- 包含数据库表创建和初始数据填充的SQL脚本
CREATE DATABASE IF NOT EXISTS survey;
USE survey;

CREATE TABLE Survey (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    note TEXT,
    type INT,
    userName VARCHAR(255),
    userId VARCHAR(255),
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE Questions (
    qId VARCHAR(255) PRIMARY KEY,
    sId VARCHAR(255),
    qTitle VARCHAR(255) NOT NULL,
    qType VARCHAR(50),
    options TEXT,
    sortNum INT,
    FOREIGN KEY (sId) REFERENCES Survey(id)
        ON DELETE CASCADE
);

CREATE TABLE Options (
    rId CHAR(36) PRIMARY KEY,
    optionName VARCHAR(255) NOT NULL,
    qId VARCHAR(255) NOT NULL,
    sortNum INT NOT NULL,
    answers VARCHAR(255),
    FOREIGN KEY (qId) REFERENCES Questions(qId)
        ON DELETE CASCADE
);

ALTER TABLE Questions
ADD COLUMN toId VARCHAR(255);

ALTER TABLE Options
ADD COLUMN toId VARCHAR(255);
