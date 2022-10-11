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
        <!--
          1.创建一个新的页面用于实现excel导入
            a:创建vue组件
            b:配置路由
            c:点击跳转
          2.修改上传组建的央视
            a:先创建上传组件
            b:在新页面使用
            c:修改样式
        -->
        <el-button type="primary" @click="importClick">导入</el-button>
        <el-button type="primary" @click="outputClick">导出</el-button>
        <!--
          1.vender文件夹复制到src下
          2.下载  npm i file-saver  插件
          3.导出点击事件中调用插件的的导出方法
          4.配置相应传入的数据实现下载
        -->
        <el-button type="primary" @click="addEvent">+ 新增员工</el-button>
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
        <el-table-column label="相片" sortable prop="staffPhoto">
          <template v-slot="{row}">
            <!--
              生成二维码
              1.点击打开弹框
                a:创建弹框
                b:定义一个显示与隐藏的变量值
                c:点击时该值位true
              2.弹框内显示一个二维码
                二维码对应的字符就是图片地址
            -->
            <img v-globalImageError="defaultImg" class="avatar" :src="row.staffPhoto" @click="imgClick(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column label="手机号" sortable prop="mobile" />
        <el-table-column label="工号" sortable prop="workNumber" />
        <!--转换聘用形式-->
        <!--1.通过formatter转换-->
        <!--<el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formatter">-->

        <!--2.通过过滤器转换-->
        <!--<el-table-column label="聘用形式" sortable prop="formOfEmployment">-->
        <!--
          过滤器:作用：字符转换 特点:不能使用this,它只能用于{{}}}与v-bind
          1):定义(全局,局部)
          局部:
            filters:{
              过滤器铭(value){
                return 转换后的值
              }
            }
          全局：
            src/filters/index.js
            export default{
              方法名(value){
                return 转换后的值
              }
            }
            在main.js注册
            import filters from ‘@filters’
            Object.keys(filtersJs).forEach(item=>{
              VUe.filter(item,filtersJs[item])
            })
          2).使用
          {{实参值|过滤器方法名}}}
          -->
        <!--
          3.通过自定义指令
            定义:
              局部:
                directives:{
                  指令名:{
                    bind:绑定(类似一beforeMount),
                    inserted:渲染后,类似一mounted,
                    update:更新时，不保证更新完成
                    componentUpdated:更新完成时(类似与updated)
                    unbind:销毁前，类似一beforeDestroy
                    unbind:(dom,obj,vnode){
                      dom:指令所在dom
                      obj:配置数据信息
                        属性，修饰符，值
                      vnode:context:能拿到指令所在组建的实例对象
                    }
                  }
                }
              使用：
                v-指令名:属性.修饰符="值"

              <el-table-column label="聘用形式" sortable prop="formOfEmployment">
                <template v-slot:="{row}">
                  <div v-form-of-employment="row.formOfEmployment " />
                </template>
              </el-table-column>
          -->
        <!--
          4.在渲染前转换
        -->
        <el-table-column label="聘用形式" sortable prop="formOfEmployment" />
        <el-table-column label="部门" sortable prop="departmentName" />
        <el-table-column label="入职时间" sortable prop="timeOfEntry" />
        <el-table-column label="状态" sortable prop="enableState" />
        <el-table-column label="操作" width="300" fixed="right">
          <template v-slot="{row}">
            <div>
              <!--
                1.创建页面
                  a.创建页面所对应组件
                  b.配置路由
                  c.点击跳转
                2.跳转过去时需要带上该用户的id，通过动态路由配置传递id
                  配置路由:{
                    path:'/xxx地址/:id?'  ?id 可传可不传，不加'?'就一定要传
                  }
                  传：
                    this.$router.push('/xxx地址/123')
                  收：
                    this.$route.params.id===123
              -->
              <el-button type="text" @click="goDetail(row.id)">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <!--
                1.创建一个角色弹框组件
                2.在父组件使用
                3.角色列表显示(多选框显示)
                  a:调用接口获取所有角色
                4.当前点击账号所拥有的角色的回显
                  调用当前接口获取当前账号所拥有的角色
                5.修改提示
                  调用接口
              -->
              <el-button type="text" @click="roleClick(row.id)">角色</el-button>
              <!--
                1.确认框
                2.定义api
                3.导入
                4.点击确定后调用
                5.调用成功
                  a:提示
                  b:刷新列表数据，回到第一页
                -->
              <el-button type="text" @click="del(row.id)">删除</el-button>
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
    <!--新增弹框组件-->
    <Add ref="add" @getData="getData" />
    <!--二维码弹框组件-->
    <el-dialog title="二维码" width="500px" :visible.sync="show">
      <!--el-dialog内的默认插槽在第一次打开后才渲染-->
      <div style="text-align: center">
        <canvas ref="canvas" />
      </div>
    </el-dialog>
    <!--分配角色弹框-->
    <Role ref="role" :is-show.sync="isShow" />
  </div>
</template>

<script>
import { sysUser, sysUserDelete } from '@/api/employees'
import employeesData from '@/api/constant/employees'
import Add from '@/views/employees/components/add'
// moment 时间转换 moment(时间值).format('yyyy-mm-dd')
import moment from 'moment'
import cookieJs from 'js-cookie'
//  js-cooke: get:获取  set:设置  remove:删除
import Qrcode from 'qrcode'
import Role from '@/views/employees/components/role'
export default {
  components: {
    Add,
    Role
  },
  filters: {
    // formatterForOf(str) {
    //   const result = employeesData.hireType.find(item => {
    //     return item.id === str
    //   })
    //   // 通过返回值取出相应的字符值
    //   return result ? result.value : ' ---'
    // }
  },
  directives: {
    // formOfEmployment: {
    //   inserted(dom, obj) {
    //     const result = employeesData.hireType.find(item => {
    //       return item.id === obj.value
    //     })
    //     const resultStr = result ? result.value : ' ---'
    //     dom.innerText = resultStr
    //   },
    //   componentUpdated(dom, obj) {
    //     const result = employeesData.hireType.find(item => {
    //       return item.id === obj.value
    //     })
    //     const resultStr = result ? result.value : ' ---'
    //     dom.innerText = resultStr
    //   }
    // }
  },
  data() {
    return {
      isShow: false,
      show: false,
      defaultImg: require('@/assets/common/head.jpg'),
      list: [{}],
      employeesData,
      page: {
        total: 100,
        size: +cookieJs.get('size') || 5, // 页容量数据持久化
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
      // 复杂数据类型，使用该数据的地方只要有一个地方(堆)改了，使用该引用的地方都会变
      res.data.rows.forEach(item => {
        const result = employeesData.hireType.find(item2 => {
          return item2.id === +item.formOfEmployment
        })
        const resultStr = result ? result.value : ' ---'
        item.formOfEmployment = resultStr
        item.timeOfEntry = moment(item.timeOfEntry).format('YYYY-MM-DD')
      })
      this.list = res.data.rows
      // console.log(this.list)
      this.page.total = res.data.total
    },
    sizeChange(size) {
      this.page.size = size
      cookieJs.set('size', size)
      this.page.page = 1
      this.getData()
    },
    pageChange(page) {
      this.page.page = page
      this.getData()
    },
    // 格式化聘用形式
    formatter(row, column, cellValue, index) {
      // employeesData.hireType:转换规则
      // cellValue:当前项值
      // 1. 找出数组中对应的项(cellValue===当前项的id)
      // 数组方法,map,forEach,findIndex,find,some...
      // const 返回值=数组.find(item=>{return boolean值，true:返回值=当前item,false...所有项都是false，返回值为undefined})
      const result = employeesData.hireType.find(item => {
        return item.id === cellValue
      })
      // 通过返回值取出相应的字符值
      return result ? result.value : ' ---'
    },
    // 新增点击事件
    addEvent() {
      this.$refs.add.isShow = true
    },
    // 删除点击
    del(id) {
      this.$confirm('您确定要删除该用户吗？', '提示').then(async() => {
        await sysUserDelete(id)
        this.$message.success('删除成功')
        this.pageChange(1)
      })
    },
    importClick() {
      this.$router.push('/employees/import')
    },
    // 详情跳转
    goDetail(id) {
      this.$router.push('/employees/detail/' + id)
    },
    // 导出功能
    async outputClick() {
      const header = {
        姓名: 'username',	// string	非必须
        手机号: 'mobile',	// string	非必须
        入职时间: 'timeOfEntry',	// string	非必须
        聘用形式: 'formOfEmployment',	// number	非必须
        工号: 'workNumber',	// string	非必须
        组织名称: 'departmentName',	// string	非必须
        转正时间: 'correctionTim'	// string	非必须

      }
      //  data数据,需求是将list数据数组中每一项(对象)中的值按header的次序一次取出
      //  拿到所有数据
      const res = await sysUser({
        page: 1,
        size: 10000
      })
      // 复杂数据类型，使用该数据的地方只要有一个地方(堆)改了，使用该引用的地方都会变
      res.data.rows.forEach(item => {
        const result = employeesData.hireType.find(item2 => {
          return item2.id === +item.formOfEmployment
        })
        const resultStr = result ? result.value : ' ---'
        item.formOfEmployment = resultStr
        item.timeOfEntry = moment(item.timeOfEntry).format('YYYY-MM-DD')
      })

      // 循环整个列表数据:为了产生一个只有值的二位数组[[值]]，他的数据次序要按照头部数组次序来
      const data = res.data.rows.map(item => {
        // const arr = []
        // Object.keys(header).forEach(item2 => {
        //   arr.push(item[header[item2]])
        // })
        // return arr
        //  循环头部数据
        return Object.keys(header).map(item2 => {
          // 按照次序return相应项的值，最终产生按次序的新数组
          return item[header[item2]]
        })
      })
      import('@/vendor/Export2Excel')
        .then(res => {
          res.export_json_to_excel({
            header: Object.keys(header),
            data,
            filename: '员工列表'
          })
        })
        .catch(() => {
        })
    },
    // 图片生成二维码
    imgClick(url) {
      if (!url) {
        return
      }
      this.show = true
      this.$nextTick(() => {
        Qrcode.toCanvas(this.$refs.canvas, url, { width: 300, height: 300 })
      })
    },
    // 分配角色点击事件
    roleClick(id) {
      // 打开角色弹框
      this.isShow = true
      //  调用api方法获取详情
      this.$refs.role.getUserInfo(id)
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

  .avatar {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }
}
</style>
