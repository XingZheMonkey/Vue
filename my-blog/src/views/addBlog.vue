<template>
  <div id="add-blog">
  	<h1 style="font-size:30px;margin-bottom:20px;">添加博客</h1>
  	<form v-if="!submitted"> 
	    <label>博客标题</label>
	    <input type="text" v-model="blog.title" required>

	    <label>博客内容</label>
	    <textarea v-model="blog.text"></textarea>

	    <div id="checkboxes">
	    	<label>Vue.js</label>
	    	<input type="checkbox" value="Vue.js" v-model="blog.categories">
	    	<label>node.js</label>
	    	<input type="checkbox" value="Node.js" v-model="blog.categories">
	    	<label>React.js</label>
	    	<input type="checkbox" value="React.js" v-model="blog.categories">
	    	<label>Angular4</label>
	    	<input type="checkbox" value="Angular4" v-model="blog.categories">
	    </div>

	    <label>作者</label>
	    <select v-model="blog.author">
	    	<option v-for="author in blog.authors">
	    		{{author}}
	    	</option>
	    </select>

	    <button v-on:click.prevent="post">添加博客</button>
    </form>
	
	<div v-if="submitted">
		<h3>您的博客发送成功</h3>
	</div>

    <div id="preview">
    	<h3 style="font-size:30px;">博客总览</h3>
    	<p>博客标题:{{blog.title}}</p>
    	<p>博客内容:</p>
    	<p>{{blog.text}}</p>
    	<p>博客分类:</p>
    	<ul>
    		<li v-for="category in blog.categories">
    			{{category}}
    		</li>
    	</ul>
    	<p>作者:{{blog.author}}</p>

    </div>
  </div>
</template>

<script>

export default {
  name: 'add-blog',
  data(){
  	return {
  		blog:{
  			title:"",
  			text:"",
  			authors:["monkey","buckey","captain"],
  			categories:[]
  		},
  		submitted:false
  		
  	}
  },
  methods:{
  	post:function(){
  		this.$http.post("http://localhost:3000/user",{
  			title:this.blog.title,
  			body:this.blog.text,
  			userId:1
  		})
  			.then(function(data){
  				console.log(data);
  				this.submitted=true;
  			})

  	}
  },
  components: {
    
  }
}
</script>

<style scoped>
	#add-blog *{
		box-sizing: border-box;
	}

	#add-blog{
		margin:20px auto;
		max-width: 600px;
		padding: 20px;
	}

	label{
		display: block;
		margin:10px 0 10px;
	}

	/*checkbox样式*/
	#checkboxes label{
		display:inline-block;
	}
	#checkboxes input{
		margin:10px 30px 0 10px;
	}
	/*输入框样式*/
	input[type="text"],select,textarea{
		display: block;
		width: 100%;
		padding: 8px;
	}
	textarea{
		height: 200px;
	}
	option{
		font-size: 18px;
	}
	/*提交按钮*/
	button{
		display:block;
		background: crimson;
		margin:20px 0;
		color: #fff;
		border: 0;
		padding:14px;
		border-radius: 4px;
		font-size: 18px;
		cursor: pointer;
	}

	/*总览样式*/
	#preview{
		padding: 10px 20px;
		border: 1px dotted #ccc;
		margin: 30px 0;
	}
	h3{
		margin-top: 10px;
	}
	p{
		margin: 10px 0;
	}
</style>
