<template>
  <div>
    <div class="title">最新知识</div>
    <div class="content">
      <div v-for="item in allData" :key="item.id">
        <h4>{{ item.updateTime }}</h4>
        <div v-html="item.updateContent"></div>
      </div>
      <div class="editor" ref="editor"></div>
      <Button
        v-if="$store.state.theme == 'blackTheme'"
        backgroundColor="transparent"
        color="#fff"
        @click="addKnow"
        >新增数据</Button
      >
      <Button v-else backgroundColor="#409eff" color="#fff" @click="addKnow"
        >新增数据</Button
      >
    </div>
  </div>
</template>

<script>
import { fetchKnowledge, addKnowledge } from "@/utils/actions";
import Message from "@components/Message/Message.vue";
import Button from "@components/Button/Button";
import E from "wangeditor";
export default {
  data() {
    return {
      editorContent: "",
      knowData: {},
      allData: [],
    };
  },
  components: {
    Button,
  },
  methods: {
    async addKnow() {
      if (this.editorContent) {
        this.knowData.updateTime = new Date().toLocaleDateString();
        this.knowData.updateContent = this.editorContent;
        const result = await addKnowledge(this.knowData);
        this.allData.push(this.knowData);
        
        this.$generate(Message, {
          message: result.msg,
          duration: 500,
          type: "success",
        }).show();

        this.editorContent = ''

        console.log(this.allData);
      }
    },
  },
  async mounted() {
    // 创建富文本
    var editor = new E(this.$refs.editor);
    editor.config.onchange = (html) => {
      this.editorContent = html;
    };
    editor.create();

    // 获取数据
    try {
      const result = await fetchKnowledge();
      this.allData = result.msg;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 26px;
  font-weight: bold;
  padding: 24px 0 0 24px;
}
.content {
  padding: 0 24px 0 24px;
  .editor {
    margin: 20px 0;
  }
}

.blackTheme .editor {
  color: #000;
}
</style>