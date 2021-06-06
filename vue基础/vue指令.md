#vue指令

##vue2.0

安装: npm install --global vue-cli
创建项目: vue init webpack project
运行: npm run dev
安装路由插件:npm install vue-router --save-dev
安装resource插件:npm install vue-resource --save-dev

##vue3.0

安装:npm install -g @vue/cli
创建项目:vue create hello-world
运行:npm run serve
安装ui插件:vue add 插件名(vuetify)
独立运行vue文件:vue serve 文件名称.vue (需要安装全局服务)
gui图形页面构建项目:vue ui

全局环境变量: 

	根目录下新建文件

		.env

		.env.development  开发环境下全局环境变量

		.env.production  生产环境下全局环境变量

		```
		export default {
		  data(){
		    return {
		      // 引入全局环境变量
		      url:process.env.VUE_APP_URL
		    }
		  }
		}

		```


配置文件
	
	根目录下新建文件

		文件名:vue.config.js

		

		// const goods=require(''); //本地地址内的接口路径

		module.exports={
			baseUrl:'/', //根目录
			outputDir:'dist', //构建输出目录
			assetsDir:'assets', //静态资源目录(js,css,img,fonts)
			lintOnSave:false, //是否开启eslint保存检测，有效值:true,false,'error'
			devServer:{
				open:false, //开启服务后是否自动打开浏览器
				host:"localhost", //本地主机域名
				port:8080, //端口号
				https:false, //是否启用https
				hotOnly:false,
				proxy:{
					// 配置跨域
					'/api':{
						target:"http://localhost:5000/api/",  //跨域地址
						ws:true,
						changeOrigin:true,
						pathRewrite:{
							'^api':''
						}
					}
				},
				// before(app){
				// 	app.get('/api/goods',(req,res)=>{
				// 		res.json();  //json内填入引入的接口名
				// 	})
				// }
			}
		}
	
