<template>
  <div class="departments">
    <el-card class="card">
      <template #header>
        <div>组织结构</div>
      </template>
      <div class="other-content">
        <TreeItem :item="topInfo" :istop="true" />
        <hr>
        <el-tree :data="treeData" :props="{label:'name'}" default-expand-all>
          <template v-slot="{data}">
            <TreeItem :item="data" style="width: 100%" />
          </template>
        </el-tree>
        <Add :init-list="initList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import TreeItem from '@/views/departments/components/TreeItem'
import { companyDepartment } from '@/api/departments'
import Add from '@/views/departments/components/Add'
export default {
  components: {
    TreeItem,
    Add
  },
  data() {
    return {
      topInfo: {
        name: '',
        manager: '负责人',
        id: ''// 给顶部数据加入id
      },
      treeData: [],
      initList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取组织架构数据
    async getData() {
      const res = await companyDepartment()
      this.initList = res.data.depts
      this.topInfo.name = res.data.companyName
      this.treeData = this.changeData(res.data.depts, '')
    },
    // 树形数据转换
    changeData(arr, pid = '') {
      return arr.filter(item => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .departments {
    padding: 15px;
    .card {
      padding: 15px;
      .other-content{
        padding: 0 30px;
      }

    }

  }
</style>
