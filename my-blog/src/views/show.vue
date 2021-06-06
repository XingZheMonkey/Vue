<template>
<!-- 自定义指令的参数，定义时是字符串，传过来也必须是字符串格式 -->
  <!-- <div v-theme:column="'narrow'" id="show-blogs"> -->
  <div v-theme="'wide'" id="show-blogs">
    <cv-search
		:theme="theme"
		:label="label"
		:placeholder="placeholder"
		:disabled="disabled"
		:small="small"
		v-model="search">
	</cv-search>

   	<!-- 为了实现搜索功能，此处应该遍历filteredBlogs,而不是blogs -->
    <div class="single-blog" v-for="blog in filteredBlogs">
    	<router-link :to="'/blog/'+blog.id">
    		<!-- 自定义指令v-rainbow 与自定义过滤器 -->
	    	<h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
	    	<article>
	    		<!-- 自定义过滤器 -->
	    		{{blog.body | snippet}}
	    	</article>
    	</router-link>
    </div>
  </div>
</template>

<script>
	export default{
		name:'show-blogs',
		data(){
			return{
				blogs:[],
				search:"",
				"theme": "",
				"label": "Search input label",
				"placeholder": "Search blog",
				"disabled": false,
				"small": false
			}
		},
		created:function(){
			// 请求数据
			this.$http.get("http://localhost:3000/user")
					.then(function(data){
						this.blogs=data.body;
						console.log(this.blogs[0].title);
					})
		},
		computed:{
			// 匹配搜索
			filteredBlogs:function(){
				return this.blogs.filter((blog)=>{
					return blog.title.match(this.search);
				})
			}
		},
		filters:{
			// 自定义局部过滤器
			
			// "to-uppercase":function(value){
			// 	return value.toUpperCase();
			// }
			
			// ES6写法
			toUppercase(value){
				// 将to-uppercase过滤器中的内容转化为大写
				return value.toUpperCase();
			},
		},
		directives:{
			// 自定义局部指令
			'rainbow':{
				bind(el,binding,vnode){
					el.style.color="#"+Math.random().toString(16).slice(2,8)
				}
			}
		}

		// 注意：自定义局部指令是复数directives,自定义局部过滤器是复数filters
	}
</script>
<style scoped>
	#show-blogs{
		max-width: 800px;
		margin:0 auto;
		font-size: 20px;
		font-family:Georgia, 'Times New Roman', Times, serif;
	}
	.single-blog{
		padding: 20px;
		margin:20px 0;
		box-sizing: border-box;
		background: #eee;
	}
	input{
		width: 100%;
		height: 30px;
		text-indent: 1em;
		box-sizing: border-box;
	}
	a{
		text-decoration: none;
	}
</style>
