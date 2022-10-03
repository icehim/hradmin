<template>
  <div class="setting">
    <!--
    查询
    1.数据获取与渲染
      a.定义查询列表api
      b.导入
      c.进入页面后就立马调用
      d.存储数据并渲染
    2.与分页关联
    新增
    1.创建弹框组件导入使用
    2.点击新增按钮打开弹框
    父子传值
      ref
      v-model
      .sync
    3.表单验证
    4.调用新增api
      a.定义
      b.导入
      c.在点击确定表单验证成功后调用
      调用成功后
        a.提示
        b.关闭弹框
        c.清空表单数据与表单验证清除
        d.刷新父级列表数据
    删除：
      1.确定提示框
      2.删除api定义
      3.导入
      4.点击确定框的确定后调用
        调用成功
          a:提示
          b：刷新列表数据(优先让页码回到第一页)
    编辑:
      1.打开弹框
      2.区分场景(有一个变量值在弹框组件用于区分，点击新增为add，点击编辑为edit)
      3.数据回显
        1.当前点击行数据包括弹框所有数据，直接深拷贝就可以
        2.当前点击行数据不包括弹框所有数据，调用接口获取详情数据
      4.表单验证是否需要调正
      5.标题调整
      6.调用编辑api
      7.分场景调用
        调用成功:
          a:关闭弹框
          b:关闭时清除验证与重置表单数据
          c:提示
          d:刷新父级列表数据
    -->
    <el-card>
      <el-tabs>
        <el-tab-pane label="角色管理" lazy>
          <el-button type="primary" style="margin-top: 20px" @click="addClick">新增角色</el-button>
          <el-table :data="list">
            <el-table-column label="序号" type="index">
              <template v-slot="{$index}">
                <div>
                  {{ (page.page - 1) * page.pagesize + $index + 1 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="角色名" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作">
              <template v-slot="{row}">
                <div>
                  <el-button type="text">分配权限</el-button>
                  <el-button type="text" @click="edit(row)">修改</el-button>
                  <el-button type="text" @click="del(row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              layout="total,sizes,prev,pager,next,jumper"
              :total="page.total"
              :current-page="page.page"
              :page-sizes="[1,5,10,100,200]"
              :page-size="page.pagesize"
              @size-change="sizeChange"
              @current-change="pageChange"
            >1
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" lazy>
          <Info />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--新增弹框组件-->
    <!--    <Add ref="add" v-model="show" />-->
    <Add ref="add" :show.sync="show" @getData="getData" />
  </div>
</template>

<script>
import Info from '@/views/setting/components/info'
import { sysRole, sysRoleDelete } from '@/api/setting'
import Add from '@/views/setting/components/add'
export default {
  components: {
    Info,
    Add
  },
  data() {
    return {
      mode: 'add',
      show: false,
      list: [{}],
      page: {
        total: 100,
        page: 1,
        pagesize: 5
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysRole(this.page)
      this.list = res.data.rows
      this.page.total = res.data.total
    },
    // 页容量改变
    sizeChange(size) {
      this.page.pagesize = size
      // 页面容量改变时最好都回到第一页
      this.page.page = 1
      this.getData()
    },
    // 页码改变
    pageChange(page) {
      this.page.page = page
      this.getData()
    },
    // 新增点击
    addClick() {
      // this.$refs.add.isShow = true
      this.show = true
      this.$refs.add.mode = 'add'
    },
    // 点击删除
    del(id) {
      this.$confirm('您确定删除该角色吗?', '提示')
        .then(async() => {
          await sysRoleDelete(id)
          this.$message.success('删除成功')
          this.page.page = 1
          this.getData()
        })
        .catch(() => {})
    },
    // 点击编辑
    edit(row) {
      this.show = true
      this.$refs.add.mode = 'edit'
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 15px;
}

.page {
  text-align: right;
  margin-top: 20px;
}
</style>
