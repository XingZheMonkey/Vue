<template>
  <div class="place">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column prop="describe" label="描述" width="180"></el-table-column>
      <el-table-column prop="income" label="收入"></el-table-column>
      <el-table-column prop="expend" label="消费"></el-table-column>
      <el-table-column prop="cash" label="现金"></el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.page_index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "place",
  data() {
    return {
      tableData:[],
      allTableData: [],
      currentPage4: 1,
      showData:[],
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
    };
  },
  methods: {
    // 控制一页显示多少数据
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },

    // 切页
    handleCurrentChange(page) {
      
      // 获取当前页数据总数，page为即将跳转的页码
      let index = this.paginations.page_size * (page - 1);

      // 数据总数
      let nums = this.paginations.page_size * page;
      
      // 容器
      let tables = [];

      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    setPagnitions() {
      // 分页属性
      this.paginations.total = this.allTableData.length;
      
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
  },
  created(){
      this.$axios.get("/api/profiles/people")
                 .then(data=>{
                     this.allTableData=data.data;
                     this.setPagnitions()
                 })
  }
};
</script>

<style scoped>
.block{
    float: right;
    margin-right: 200px;
    margin-top: 30px;
}
</style>
