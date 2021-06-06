<template>
  <el-dialog
    title="编辑课程"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="showDialog"
  >
    <el-form
      :rules="rules"
      ref="ruleForm"
      :model="form"
      label-width="100px"
      size="small"
      class="form-box"
    >
      <!-- 课程名称 -->
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
      </el-form-item>

      <!-- 课程等级 -->
      <el-form-item label="课程等级" prop="courseLevel">
        <el-select v-model="form.courseLevel" placeholder="请选择课程等级">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>

      <!-- 报名人数 -->
      <el-form-item label="报名人数" prop="count">
        <el-input v-model="form.count" placeholder="请输入报名人数"></el-input>
      </el-form-item>

      <!-- 时间控件 -->
      <el-form-item label="上线时间" prop="date">
        <el-date-picker
          type="date"
          label="上线时间"
          prop="date"
          v-model="form.date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <!-- checkbox -->
      <el-form-item label="技术栈" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="node" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="ps" name="type"></el-radio>
          <el-radio label="pr" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
      <el-button size="small" type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Dialog extends Vue {
  // 属性或参数中使用！，表示强制解析（告诉typescript编辑器，这里一定有值）
  @Prop(Boolean) showDialog!: boolean;

  @Prop(Object) form!: {
    courseName: string;
    courseLevel: string;
    type: string;
    count: Number;
    date: String;
    _id: string;
  };

  @Provide() rules: any = {
    courseName: [{ required: true, message: "请输入课程名", trigger: "blur" }],
    courseLevel: [
      { required: true, message: "请选择课程等级", trigger: "change" }
    ],
    count: [{ required: true, message: "请输入报名人数", trigger: "blur" }],
    type: [{ required: true, message: "请选择技术栈", trigger: "change" }],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择时间",
        trigger: "change"
      }
    ]
  };

  submitForm(): void {
    (this.$refs.ruleForm as any).validate((valid: boolean) => {
      if (valid) {
        (this as any).$axios
          .post(`/api/profile/editData/${this.form._id}`, this.form)
          .then((res: any) => {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            // 触发注册的关闭事件
            this.$emit("closeDialog");
          });
      }
    });
  }

  created() {
    
  }
}
</script>

<style scoped>
</style>