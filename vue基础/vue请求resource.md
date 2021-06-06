# vue-resource

## get请求

```
  <!-- 操作本地接口 -->
		created:function(){
			this.$http.get("http://localhost:9090/posts.json")

					.then(function(data){
						<!-- 只请求前10条数据 -->
						this.blogs=data.body.slice(0,10);
						console.log(data);
					})
		}
```

#### 注意:vue-cli3可以直接用这种方式请求本地数据，并且这个json文			件存储在public文件夹下

#### 注意:vue-2.0版本需要将json文件存储在static文件夹下，访问时需要用相对路径访问


## post请求

```
post:function(){
  		this.$http.post("http://jsonplaceholder.typicode.com/posts",{
  			<!-- 发送的数据内容 -->
  			title:this.blog.title,
  			body:this.blog.content,
  			userId:1
  		})
  			.then(function(data){
  				console.log(data);
  			})

  	}
```