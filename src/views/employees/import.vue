<template>
  <div class="import">
    <el-card>
      <h2 class="title">员工导入</h2>
      <update-excel :before-upload="beforeUpload" :on-success="onSuccess" />
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import { sysUserBatch } from '@/api/employees'
export default {
  name: 'Import',
  components: {},
  methods: {
    beforeUpload(file) {
      return true
    },
    async onSuccess(obj) {
      //  将数据的中文key转换为英文  1.数组循环  2：对象循环  拿到每一个key与value值，单独生成一个新对象添加到数组
      // form: {
      //     timeOfEntry: '',	// string	非必须		入职时间
      //     username: '',	// string	非必须		姓名
      //     workNumber: '',	// string	非必须		工号
      //     mobile: '',	// string	非必须		手机号
      //     correctionTim: ''	// string	非必须		转正时间
      // },
      // 转换规则
      const temp = {
        入职日期: 'timeOfEntry',
        姓名: 'username',
        工号: 'workNumber',
        手机号: 'mobile',
        转正日期: 'correctionTim'
      }
      // 1.循环列表数据
      const newArr = obj.results.map(item => {
        const newObj = {}
        // 2.循环对象数据
        Object.keys(item).forEach(item2 => {
          // 3.产生一个以英文为key的对象
          if (item2 === '入职日期' || item2 === '转正日期') {
            newObj[temp[item2]] = this.changeDate(item[item2])
          } else {
            newObj[temp[item2]] = item[item2]
          }
        })
        return newObj
      })
      // 调用api
      await sysUserBatch(newArr)
      this.$message.success('导入成功')
      this.$router.push('/employees')
    },
    changeDate(num) {
      // excel时间特性:它是1900年开始，以天数计算时间到目前的总天数，以1开始为单位，以8点作为起点时间
      // 将天数转换成时间戳
      // 先将总天数转换成时间戳，-1天，-8小时候后的时间戳
      const t = new Date((num - 1) * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000)
      // 这个t时间就是1970年到现在的时间值
      t.setYear(t.getFullYear() - 70)
      return moment(t).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.import{
  padding: 20px;
  .title{
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
