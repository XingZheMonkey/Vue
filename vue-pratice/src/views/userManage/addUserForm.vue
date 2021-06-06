<template>
  <div :class="[
      theme == 'blackTheme' ? 'blackTheme' : 'whiteTheme',
      'userForm',
    ]">
    登录邮箱 ：<Input type="text" v-model="user.email" /> 登录密码 ：<Input
      type="text"
      v-model="user.password"
      placeholder="登录密码，不填则默认为123456"
    />

    <DefineSelect
      placeholder="角色"
      :role="user.key"
      :optionsData="optionsData"
      @chooseOption="choose($event)"
    ></DefineSelect>
    <Button
      v-if="theme == 'blackTheme'"
      backgroundColor="transparent"
      color="#fff"
      @click="addUser"
      >确认添加</Button
    >

    <Button v-else backgroundColor="#409eff" color="#fff" @click="addUser"
      >确认添加</Button
    >
  </div>
</template>

<script>
import Input from "@components/Input/Input.vue";
import Button from "@components/Button/Button.vue";
import DefineSelect from "@components/Select/DefineSelect";

export default {
  components: {
    Input,
    Button,
    DefineSelect,
  },
  props: {
    theme: String,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        key:''
      },
      optionsData: [
        {
          name: "Admin",
          value: "admin",
          des: "Administrator. Have access to view all pages.",
        },
        {
          name: "Visitor",
          value: "Visitor",
          des: "Just a visitor. Can only see the home page and document page. ",
        },
      ],
    };
  },
  methods: {
    addUser() {},
    choose( value) {
      this.user.key = value;
    },
  },
};
</script>

<style lang="less">
.userForm {
  input {
    margin-bottom: 20px;
    margin-top: 10px;
  }
}
</style>