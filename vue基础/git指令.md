#git指令

首先进入文件夹
	

	touch index.html  命令行创建文件
	touch index.js  命令行创建文件

	1.git init 初始化本地仓库

	git config --global user.name ''  配置用户名

	git config --global user.email ''  配置邮箱

	2.git add . 添加全部文件

	git add *.html 添加全部html文件

	git add index.html 添加名为index的html文件

	git rm --cached index.html 删除要添加的html文件

	git status 查看文件状态

	3.git commit -m "备注内容" 提交(进入备注界面,输入i键入内容,按住esc+:键调出退出命令，输入wq退出)

	4.git remote add origin "远程仓库地址"

	5.git push -u origin master 推送到仓库

	git pull 从远程仓库拉取数据

	git clone 从远程仓库拷贝数据

### 删除文件命令:

	1.删除本地文件
	2.git add .
	3.git commit -m '标识'
	4.git puch origin master

注意:本质不过是删除文件，再更新上传


	```
	git init
	git add README.md
	git commit -m "first commit"
	git remote add origin https://github.com/XingZheMonkey/own-study.git
	git push -u origin master
	```
