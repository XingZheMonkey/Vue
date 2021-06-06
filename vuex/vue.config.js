// const goods=require(''); //本地地址内的接口路径

module.exports={
	outputDir:'dist', //构建输出目录
	assetsDir:'assets', //静态资源目录(js,css,img,fonts)
	lintOnSave:false, //是否开启eslint保存检测，有效值:true,false,'error'
	devServer:{
		open:false, //开启服务后是否自动打开浏览器
		host:"localhost", //本地主机域名
		port:8081, //端口号
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