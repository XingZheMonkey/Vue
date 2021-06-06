<template>
	<nav>
		<ul>
			<li>
				<!-- exact解决样式重用问题 -->
				<router-link :to="{name:'show'}" exact>博客</router-link>
				<router-link :to="{name:'addBlog'}" exact>写博客</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default{
		name:"header-blog"
	}
</script>

<style scoped>
	ul{
		list-style: none;
		text-align: center;
		margin:0;
	}
	li{
		display: inline-block;
		margin:0 10px;
	}
	a{
		text-decoration: none;
		color: #fff;
		padding: 12px;
		border-radius: 5px;
		margin-right: 10px;
	}
	nav{
		background: crimson;
		padding: 30px 0;
		margin-bottom: 40px;
	}
	.router-link-active{
		background: rgba(255,255,255,0.8);
		color: #444;
	}
</style>