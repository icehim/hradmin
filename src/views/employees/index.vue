<template>
  <div class="employees">
    <!--
    查：
    1.定义api
    2.导入
    3.进入页面就调用，存储数据并渲染
    4.与分页建立联系
-->
    <el-card class="top-card">
      <div class="btn">
        <el-button type="primary">导入</el-button>
        <el-button type="primary">+ 新增员工</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="list">
        <el-table-column label="序号" type="index">
          <template v-slot:="{$index}">
            <div>
              {{ (page.page - 1) * page.size + $index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" sortable prop="username" />
        <el-table-column label="手机号" sortable prop="mobile" />
        <el-table-column label="工号" sortable prop="workNumber" />
        <!--转换聘用形式-->
        <el-table-column label="聘用形式" sortable prop="formOfEmployment">
          <template v-slot:="{row}">
            <div>
              employeeData.hireType
              {{ row.formOfEmployment }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="部门" sortable prop="departmentName" />
        <el-table-column label="入职时间" sortable prop="timeOfEntry" />
        <el-table-column label="状态" sortable prop="enableState" />
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
        <el-pagination
          layout="total,sizes,prev,pager,next,jumper"
          :total="page.total"
          :page-sizes="[1,5,10,100,200]"
          :page-size="page.size"
          :current-page="page.page"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { sysUser } from '@/api/employees'
import employeesData from '@/api/constant/employees'
export default {
  data() {
    return {
      list: [{}],
      employeesData,
      page: {
        total: 100,
        size: 5,
        page: 1
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      const res = await sysUser(this.page)
      this.list = res.data.rows
      this.page.total = res.data.total
    },
    sizeChange(size) {
      this.page.size = size
      this.page.page = 1
      this.getData()
    },
    pageChange(page) {
      this.page.page = page
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.employees {
  padding: 20px;

  .top-card {
    margin-bottom: 15px;

    .btn {
      text-align: right;
    }
  }

  .page {
    padding-top: 15px;
    text-align: right;
  }
}
</style>
