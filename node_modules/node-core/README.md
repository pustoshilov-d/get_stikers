## 简介
`node-core` 是一个基于 Egg.js 的 Node.js 服务端基础框架。

## 安装
```bash
$ npm install --save node-core
```

## 案例
一个完整的例子：[链接](https://github.com/zhaotoday/egg.js)。

## 问题和建议
请提 issue：[链接](https://github.com/zhaotoday/node-core/issues)。

## 已支持的插件
- [egg-view-ejs](https://github.com/eggjs/egg-view-ejs)
- [egg-sequelize](https://github.com/eggjs/egg-sequelize)
- [egg-cors](https://github.com/eggjs/egg-cors)
- [egg-jwt](https://github.com/okoala/egg-jwt)

## 参考
- [Node.js 中文网](http://nodejs.cn/)
- [Node之旅](http://www.hunaisong.cn/category/tech-note/node%E4%B9%8B%E6%97%85/)
- [Egg.js 官网](https://eggjs.org/zh-cn/)
- [框架开发](https://eggjs.org/zh-cn/advanced/framework.html)
- [Egg.js 中间件](https://github.com/eggjs/egg/blob/master/docs/source/zh-cn/basics/middleware.md)
- [前后端分离之JWT用户认证](http://lion1ou.win/2017/01/18/)
- [NodeJs JsonWebToken](http://blog.csdn.net/qq_27818541/article/details/53067387)
- [NodeJs使用json web token验证REST服务](http://blog.csdn.net/offbye/article/details/47617367)
- [JWT Example](https://github.com/yin-fan/todoList)
- [sequelizejs docs](http://docs.sequelizejs.com/)
- [EJS 中文文档](https://segmentfault.com/a/1190000004286562)
- [EJS 模板语言使用](https://www.w3cschool.cn/weflow/weflow-ejs.html)

## 使用方法
创建 `articles` model:
```js
// app/model/articles.js
module.exports = app => {
  const {STRING, TEXT, INTEGER} = app.Sequelize

  return app.model.define('articles', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    author: {
      type: STRING(50),
      allowNull: true
    },
    title: {
      type: STRING(200),
      allowNull: false
    },
    subtitle: {
      type: STRING(200),
      allowNull: true
    },
    description: {
      type: TEXT('tiny'),
    },
    content: {
      type: TEXT('long'),
      allowNull: true
    },
    image: {
      type: INTEGER(8),
      allowNull: true
    },
    category_id: {
      type: INTEGER,
      allowNull: true
    }
  })
}
```


创建 `articles` service:
```js
// app/service/articles.js
module.exports = app => {
  return class extends app.Service {
    constructor (ctx) {
      super(ctx)

      this.module = 'articles'
    }
  }
}
```

创建 `articles` controller:
```js
// app/controller/articles.js
module.exports = app => {
  return class extends app.Controller {
    constructor (ctx) {
      super(ctx)

      this.module = 'articles'
    }
  }
}
```