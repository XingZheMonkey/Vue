# jsonserver

1.安装全局工具:npm install -g json-server

2.进入本地文件夹，以后操作在这个文件夹中进行

3.初始化package.json文件: npm init 

4.安装模块 npm install json-server --save

5.调整启动方式:json:server

```
{
  "name": "jsonserver",
  "version": "1.0.0",
  "description": "api",
  "main": "index.js",
  "scripts": {
    "json:server":"json-server --watch db.json"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "json-server": "^0.15.0"
  }
}
```

6.创建db.json,写入json数据

7.启动json-server:npm run json:server

8.访问接口

# 访问接口的方式

1.获取所有用户信息
http://localhost:3000/users

2.获取id为1的用户信息
http://localhost:3000/users/1

3.获取公司的所有信息
http://localhost:3000/companies

4.获取单个公司的信息
http://localhost:3000/companies/1

5.获取所有公司id为3的用户信息
http://localhost:3000/companies/3/users

6.根据公司名字获取信息
http://localhost:3000/companies?name=Microsoft

7.根据多个公司名称获取数据
http://localhost:3000/companies?name=Microsoft&name=Apple

8.获取一页中只有两条数据
http://localhost:3000/companies?_page=1&_limit=2

9.升序排序
http://localhost:3000/companies?_sort=name&_order=asc

10.获取年龄30以上的
http://localhost:3000/users?age_gte=30

11.获取年龄在30-40之间的用户
http://localhost:3000/users?age_gte=30&age_lte=40

12.搜索用户信息(h是过滤名字带h的用户)
http://localhost:3000/users?q=h


