<template>
    <div ref="editor" style="text-align:left"></div>
</template>

<script>
import E from 'wangeditor'
export default {
    name:"editor",
    data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent() {
            alert(this.editorContent)
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
}
</script>

<style  scoped>

</style>