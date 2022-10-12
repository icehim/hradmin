<template>
  <div class="permission">
    <el-card>
      <div style="text-align: right">
        <!--
          增
          1.创建一个弹框组件
          2.完成样式
          3.应用到父组件
          4.可以控制打开关闭
            ref
            v-model
            .sync
          5.完成表单验证
          6.定义新增api
          7.导入新增api
          8.在表单验证成功后调用api
          9:调用成功
            提示
            关闭弹框
            关闭弹框时要清空表单数据与表单错误验证
            刷新父级列表数据
        -->
        <el-button type="primary" @click="addEvent(1,'0')">添加权限页面</el-button>
      </div>
      <!--
        table树形渲染
        1.数据要有children
        2.el-table row-key="每一条数据的唯一标识的字段名(id)"
      -->
      <el-table :data="list" row-key="id">
        <el-table-column label="菜单名称" prop="name" />
        <el-table-column label="权限标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作" width="450px">
          <template v-slot="{row}">
            <div>
              <el-button v-if="row.type===1" type="text" @click="addEvent(1,row.id)">添加权限页面</el-button>
              <el-button v-if="row.type===1" type="text" @click="addEvent(2,row.id)">添加权限按钮</el-button>
              <!--
                编辑:
                  1.点击编辑打开弹框组件
                  2.弹框组件内有一个参数值用于区分新增与编辑，编辑点击时设置相应的值位编辑对应字段，新增也是如此
                  3.数据回显
                    a:如果当前行数据满足所有回显要求，直接深拷贝并传值到弹框组件
                    b:不满足，通过id请求完整数据并回显
                  4.标题调整
                  5:可能  有表单验证调整
                  6.定义编辑api
                  7.导入编辑api
                  8.分场景条用
                  9.调用完成
                    关闭弹窗
                    清除数据与表单校验
                    刷新列表
                    提示
              -->
              <el-button type="text" @click="edit(row)">修改权限点</el-button>
              <!--
                删除:
                  1.确定提示框
                  2.点击删除api
                  3.导入
                  4.点击确定后执行删除
                  5.删除成功
                    a:提示
                    b:刷新列表数据
              -->
              <el-button type="text" @click="del(row.id)">删除权限点</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--新增组件-->
    <Add ref="add" v-model="show" @getData="getData" />
  </div>
</template>

<script>
import { sysPermission, sysPermissionDelete } from '@/api/permission'
import Add from './components/add'
export default {
  components: {
    Add
  },
  data() {
    return {
      show: false,
      list: [{}]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysPermission()
      this.list = this.changeData(res.data, '0')
    },
    changeData(arr, pid) {
      return arr.filter(item => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    // 新增点击
    addEvent(type, pid) {
      this.show = true
      this.$refs.add.mode = 'add'
      this.$refs.add.form.type = type
      this.$refs.add.form.pid = pid
    },
    // 删除方法
    del(id) {
      this.$confirm('您确定删除该数据吗?', '提示')
        .then(async() => {
          await sysPermissionDelete(id)
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    },
    // 编辑
    edit(row) {
      this.show = true
      this.$refs.add.mode = 'edit'
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
    }
  }
}
</script>

<style lang="scss" scoped>
  .permission{
    padding: 20px;
  }
</style>
