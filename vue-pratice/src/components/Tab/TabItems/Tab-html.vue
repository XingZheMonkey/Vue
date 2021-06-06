<template>
  <div>
    <ul>
      <li>webp减少图片尺寸 (转换webp格式的方法 ： 智图,ISpartawebp ; 需要借助srcset实现全浏览器兼容)</li>

      <li>使用雪碧图</li>

      <li>使用base64</li>

      <li>使用字体图标来代替图片</li>

      <li>避免使用层级较深的选择器，或使用其他一些复杂的选择器</li>

      <li>
        元素适当的定义高度或最小高度，否则页面动态内容载入时，会出现页面元素的晃动，造成回流
      </li>

      <li>
        给图片设置尺寸。如果图片不设置尺寸，首次载入时，占用空间会从0到完全显示，可能发生位移，造成回流
      </li>

      <li>能用css实现的不用js实现</li>

      <li>
        大量dom节点动态渲染时，要将所有dom节点处理完成后，再一次性添加到页面上，以节省性能
      </li>

      <li>css引用外部文件，link放在head中</li>

      <li>js文件引入放在body后</li>

      <li>及时清除对象引用，清除定时器，清除事件监听器</li>

      <li>使用 requestAnimationFrame 代替 定时器动画</li>

      <li>动画实现的过程中，启用GPU硬件加速：transform:translateZ(0)</li>

      <li>为动画元素新建图层，提高元素的z-index</li>

      <li>不要把获取某些dom节点的属性值放在一个循环里当做循环的变量</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Tab-html",
};
</script>

<style lang="less" scoped>
ul {
  padding:0 20px;
  li {
    margin-top: 20px;
    list-style: decimal;
  }
}
</style>