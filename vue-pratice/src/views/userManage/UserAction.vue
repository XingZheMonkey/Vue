<template>
  <div class="userManage">
    <table cellspacing="0" cellpadding="0" border="0">
      <tr>
        <th>用户名</th>
        <th>角色</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
      <tr ref="col" v-for="user in users" :key="user.id">
        <td>{{ user.email }}</td>
        <td>
          <DefineSelect
            placeholder="角色"
            :optionsData="optionsData"
            :role="user.key"
            :disabled="user.email == '1559198728@qq.com' ? true : false"
            @chooseOption="choose(user, $event)"
          ></DefineSelect>
        </td>
        <td>
          {{ user.key == "Admin" ? optionsData[0].des : optionsData[1].des }}
        </td>
        <td>
          <template v-if="user.email != '1559198728@qq.com'">
            <Button
              v-if="$store.state.theme == 'blackTheme'"
              backgroundColor="transparent"
              color="#fff"
              @click="modify(user)"
              >修改</Button
            >
            <Button
              v-else
              backgroundColor="#409eff"
              color="#fff"
              @click="modify(user)"
              >修改</Button
            >
          </template>
        </td>
      </tr>
    </table>
    <Button
      v-if="$store.state.theme == 'blackTheme'"
      backgroundColor="transparent"
      color="#fff"
      @click="addUser"
      >新增用户</Button
    >
    <Button v-else backgroundColor="#409eff" color="#fff" @click="addUser"
      >新增用户</Button
    >
  </div>
</template>

<script>
import DefineSelect from "@components/Select/DefineSelect";
import Button from "@components/Button/Button";
import { fetchUsers, modifyUserInfo } from "@/utils/actions";
import Message from "@components/Message/Message.vue";
import Form from "./addUserForm"
export default {
  components: {
    DefineSelect,
    Button,
  },
  //   watch: {
  //     users() {
  //       this.$nextTick(() => {
  //         console.log(this.$refs.col);
  //       });
  //     },
  //   },
  data() {
    return {
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
      users: {},
    };
  },
  methods: {
    choose(user, value) {
      user.key = value;
    },
    async modify(user) {
      try {
        const res = await modifyUserInfo(user);
        this.$generate(Message, {
          message: res.msg,
          duration: 2000,
          type: res.type,
        }).show();
      } catch (e) {
        console.log(e);
      }
    },
    addUser() {
      this.$createModal(null,Form,{theme:this.$store.state.theme})
    },
  },
  async created() {
    try {
      this.users = await fetchUsers();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="less" scoped>
.userManage {
  padding: 24px 24px 0 24px;
  border-radius: 3px;
  table {
    table-layout: fixed;
    width: 100%;
    font-size: 14px;
    margin-bottom: 20px;
    tr {
      td,
      th {
        padding: 12px 0;
        text-align: left;
      }
    }
  }
}

.whiteTheme .userManage {
  th {
    color: #909399;
  }
  td,
  th {
    border-bottom: 1px solid #ebeef5;
  }
}
.blackTheme .userManage {
  th {
    color: #c6c6c6;
  }
  td,
  th {
    border-bottom: 1px solid #5a5a5a;
  }
}
</style>