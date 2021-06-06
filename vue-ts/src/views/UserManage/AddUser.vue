<template>
  <div class="add-user">
    <el-dialog
      :visible.sync="dialogVisible"
      title="新增账户"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form :rules="rules" label-width="100px" ref="ruleForm" :model="account">
        <el-form-item label="请选择角色" prop="role">
          <el-select @change="selectChange" v-model="account.role" placeholder="请选择角色">
            <el-option
              v-for="option in options"
              :label="option.role"
              :value="option.role"
              :key="option.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请选择账号" prop="name">
          <el-input v-model="account.name" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="请输入密码" prop="password">
          <el-input v-model="account.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="$emit('closeDialog')">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component({
  components: {}
})
export default class AddUser extends Vue {
  @Prop(Boolean) dialogVisible!: Boolean;
  @Prop(Array) options!: any;

  @Provide() account: object = {
    key: "",
    role: "",
    des: "",
    name: "",
    password: ""
  };

  @Provide() rules: any = {
    name: [{ required: true, message: "请输入账户", trigger: "blur" }],
    role: [{ required: true, message: "请选择身份", trigger: "change" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  selectChange(select: string) {
    this.options.map((option: any) => {
      if (option.role == select) {
        (this as any).account.role = option.role;
        (this as any).account.des = option.des;
        (this as any).account.key = option.key;
      }
    });
  }

  addUser() {
    (this.$refs.ruleForm as any).validate((valid: Boolean) => {
      if (valid) {
        (this as any).$axios
          .post("/api/user/register", this.account)
          .then((res: any) => {
            this.$emit("closeDialog");
            this.$emit("updateUser");
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          });
      }
    });
  }
}
</script>

<style  lang="less" scoped>
.el-input {
  width: 218px;
}
</style>