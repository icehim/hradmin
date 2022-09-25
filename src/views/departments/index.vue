<template>
  <div class="departments">
    <el-card class="card">
      <template #header>
        <div>组织结构</div>
      </template>
      <div class="other-content">
        <TreeItem :item="topInfo" />
        <hr>
        <el-tree :data="treeData" :props="{label:'name'}" default-expand-all>
          <template v-slot="{data}">
            <TreeItem :item="data" style="width: 100%" />
          </template>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>

<script>
import TreeItem from '@/views/departments/components/TreeItem'
import { companyDepartment } from '@/api/departments'
export default {
  components: {
    TreeItem
  },
  data() {
    return {
      topInfo: {
        name: '',
        manager: '负责人'
      },
      treeData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await companyDepartment()
      this.topInfo.name = res.data.companyName
      console.log(res)
      this.treeData = this.changeData(res.data.depts, '')
    },
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
