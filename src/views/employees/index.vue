<template>
  <div class="employees">
    <el-card class="top-card">
      <div class="btn">
        <el-button type="primary">导入</el-button>
        <el-button type="primary">+ 新增员工</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="list">
        <el-table-column label="序号" type="index" />
        <el-table-column label="姓名" sortable />
        <el-table-column label="手机号" sortable />
        <el-table-column label="工号" sortable />
        <el-table-column label="聘用形式" sortable />
        <el-table-column label="部门" sortable />
        <el-table-column label="入职事件" sortable />
        <el-table-column label="是否在职" sortable />
        <el-table-column label="状态" sortable />
        <el-table-column label="操作" width="300" fixed="right">
          <template>
            <div>
              <el-button type="text">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="total,sizes,prev,pager,next,jumper" :total="page.total" :page-sizes="[1,5,10,100,200]" :page-size="page.pagesize" :current-page="page.page" @size-change="sizeChange" @current-change="pageChange" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{}],
      page: {
        total: 100,
        pagesize: 5,
        page: 1
      }
    }
  },
  methods: {
    sizeChange(size) {
      this.page.pagesize = size
    },
    pageChange(page) {
      this.page.page = page
    }
  }
}
</script>

<style lang="scss" scoped>
.employees{
  padding: 20px;
  .top-card {
    margin-bottom: 15px;
    .btn{
      text-align: right;
    }
  }
.page{
  padding-top: 15px;
  text-align: right;
}
}
</style>
