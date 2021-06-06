<template>
  <div class="tableData">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input size="small" v-model="searchVal" placeholder="请输入搜索关键词" class="search"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width:100%" :height="tHeight" class="table-class">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="课程名称" prop="courseName"></el-table-column>
      <el-table-column label="课程等级" prop="courseLevel" width="120"></el-table-column>
      <el-table-column label="技术栈" prop="type" width="120"></el-table-column>
      <el-table-column label="报名人数" prop="count" width="120"></el-table-column>
      <el-table-column label="上线日期" prop="date" width="160"></el-table-column>
      <el-table-column label="操作" width="160" v-if="getUser.key != 'tourist'">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="pages" ref="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,15]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 模态框 -->
    <EditDialog @closeDialog="closeDialog" :showDialog="showDialog" :form="formData"></EditDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import EditDialog from "./EditDialog.vue";
import { asyncRouterMap } from "../../router/index";
@Component({
  components: {
    EditDialog
  }
})
export default class TableData extends Vue {

  @Getter("user") getUser:any;

  @Provide() searchVal: string = "";

  @Provide() tHeight: number = document.body.offsetHeight - 270;

  @Provide() tableData: any = [];

  @Provide() page: number = 0; // 当前page

  @Provide() size: number = 5;

  @Provide() total: number = 0;

  @Provide() showDialog: Boolean = false;

  @Provide() formData: object = {
    courseName: "",
    courseLevel: "",
    type: "",
    count: "",
    date: ""
  };

  // 根据页码和数量加载数据
  loadData() {
    (this as any)
      .$axios(`/api/profile/profileInfo/${this.page}/${this.size}`)
      .then((res: any) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        this.tableData.forEach((item: any) => {
          item.date = item.date.substring(0, 10);
        });
      });
  }

  // 获取筛选后的数据
  loadSearchData() {
    (this as any).$axios
      .get(
        `/api/profile/searchData/${this.searchVal}/${this.page}/${this.size}`
      )
      .then((res: any) => {
        this.total = res.data.total;
        this.tableData = res.data.list;
        this.tableData.forEach((item: any) => {
          item.date = item.date.substring(0, 10);
        });
      });
  }

  // 控制一页显示几条数据
  handleSizeChange(val: number): void {
    this.size = val;
    this.page = 0;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }

  // 控制当前显示第几页
  handleCurrentChange(val: number): void {
    this.page = (val - 1) * this.size;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }

  // 点击搜索时触发的操作
  handleSearch(): void {
    this.page = 0;
    this.searchVal ? this.loadSearchData() : this.loadData(); // 对是否进行搜索进行判断，避免按钮事件出问题
  }

  // 点击编辑按钮时进行的相关操作
  handleEdit(index: number, row: any) {
    this.formData = row;
    this.showDialog = true;
  }

  // 编辑页面取消按钮对应事件
  closeDialog() {
    this.showDialog = false;
  }

  // 删除按钮相关操作
  handleDelete(index: number, row: any) {
    (this as any).$axios
      .post(`/api/profile/deleteData/${row._id}`)
      .then((res: any) => {
        // 对应更新页面
        this.tableData.splice(index, 1);

        // 成功提示
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      });
  }

  created() {
    this.loadData();
  }
}
</script>

<style lang="less" scoped>
.tableData {
  padding: 20px;
  .search {
    width: 20%;
    margin-right: 20px;
    margin-bottom: 30px;
  }
  .pages {
    margin-top: 20px;
    float: right;
  }
}
</style>