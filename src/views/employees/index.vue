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
        <el-table-column label="手机号" sortable prop="mobile" />
        <el-table-column label="工号" sortable prop="workNumber" />
        <!--转换聘用形式-->
        <!--1.通过formatter转换-->
        <!--<el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formatter">-->

        <!--2.通过过滤器转换-->
        <!--        <el-table-column label="聘用形式" sortable prop="formOfEmployment">-->

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
    <!--新增弹框组件-->
    <Add ref="add" />
  </div>
</template>

<script>
import { sysUser } from '@/api/employees'
import employeesData from '@/api/constant/employees'
import Add from '@/views/employees/components/add'
export default {
  components: {
    Add
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
    formOfEmployment: {
      inserted(dom, obj) {
        const result = employeesData.hireType.find(item => {
          return item.id === obj.value
        })
        const resultStr = result ? result.value : ' ---'
        dom.innerText = resultStr
      },
      componentUpdated(dom, obj) {
        const result = employeesData.hireType.find(item => {
          return item.id === obj.value
        })
        const resultStr = result ? result.value : ' ---'
        dom.innerText = resultStr
      }
    }
  },
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
      // 复杂数据类型，使用该数据的地方只要有一个地方(堆)改了，使用该引用的地方都会变
      res.data.rows.forEach(item => {
        const result = employeesData.hireType.find(item2 => {
          return item2.id === item.formOfEmployment
        })
        const resultStr = result ? result.value : ' ---'
        item.formOfEmployment = resultStr
      })
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
