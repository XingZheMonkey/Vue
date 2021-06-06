<template>
  <div class="userData">
    <div class="add-btn">
      <el-button type="primary" @click="addAccount">新增用户</el-button>
    </div>

    <el-table :data="tableData" border style="width:100%">
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-select
            v-if="scope.row.edit"
            v-model="scope.row.role"
            @change="selectChange(scope.row)"
          >
            <el-option
              v-for="option in options"
              :label="option.role"
              :value="option.role"
              :key="option.role"
            ></el-option>
          </el-select>
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="des"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.name!='henry'">
          <el-button
            v-if="!scope.row.edit"
            @click="handleEdit(scope.$index,scope.row)"
            size="mini"
          >编辑</el-button>
          <el-button
            v-else
            type="success"
            @click="handleSave(scope.$index,scope.row)"
            size="mini"
          >完成</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <AddUser
      :dialogVisible="dialogVisible"
      :options="options"
      @closeDialog="closeDialog"
      @updateUser="updateUser"
    ></AddUser>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import AddUser from "./AddUser.vue";
@Component({
  components: { AddUser }
})
export default class UserData extends Vue {
  @Provide() tableData: any = [];

  @Provide() dialogVisible: Boolean = false;

  @Provide() options: any = [
    {
      key: "admin",
      role: "管理员",
      des: "Administrator. Have access to view all pages. "
    },
    {
      key: "tourist",
      role: "游客",
      des: "Just a visitor. Can only see the home page and document page. "
    },
    {
      key: "server",
      role: "客服",
      des: "Normal Editor. Can see all pages except permission page. "
    }
  ];

  // 新增按钮事件
  addAccount() {
    this.dialogVisible = true;
  }

  // 关闭dialog按钮事件
  closeDialog() {
    this.dialogVisible = false;
  }

  // 获取数据
  getUserData() {
    (this as any).$axios.get("/api/user/allUser").then((res: any) => {
      res.data.forEach((item: any) => {
        item.edit = false;
      });
      this.tableData = res.data;
    });
  }

  //   选项变更时对应更改des和key
  selectChange(item: any) {
    this.options.map((option: any) => {
      if (option.role == item.role) {
        item.key = option.key;
        item.des = option.des;
      }
    });
  }

  // 点击编辑按钮触发的事件
  handleEdit(index: number, row: any) {
    row.edit = true;
  }

  //  点击完成按钮触发的事件操作
  handleSave(index: number, row: any) {
    row.edit = false;
    (this as any).$axios
      .post(`/api/user/editUser/${row._id}`, row)
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      });
  }

  // 点击删除时触发的操作
  handleDelete(index: number, row: any) {
    (this as any).$axios
      .post(`/api/user/deleteUser/${row._id}`)
      .then((res: any) => {
        this.getUserData();
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      });
  }

  created() {
    this.getUserData();
  }

  updateUser() {
    this.getUserData();
  }
}
</script>

<style  lang="less" scoped>
.userData {
  padding: 20px;
  .add-btn {
    margin-bottom: 10px;
  }
}
</style>