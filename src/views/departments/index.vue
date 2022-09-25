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
        name: '教育',
        manager: '校长'
      },
      treeData: [{
        name: '市场部',
        manager: '部长',
        children: [{
          name: '北京事业部',
          manager: '部长2'
        }]
      }]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await companyDepartment()
      this.treeData = res.data.depts
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
