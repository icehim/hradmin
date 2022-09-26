<template>
  <div>公司设置
    <!--弹框组件
      el-dialog
        title:标题
        width：宽度
        visible:是否显示弹窗

        slot="默认插槽(内容)/footer(取消与确定按钮)"
    -->
    <el-button @click="showDialog">显示弹窗</el-button>
    <Dialog ref="dialog" :value.sync="show" />
    <!--v-model
      子组件标签 :value="负组件属性" @input="父组件属性=$event"
      子组件标签 v-model="父组件属性"
      子组件内:
        props:['value']
        this.$emit('input',修改后的值)
    -->

    <!--sync用法：-->
    <h3>
      sync
    </h3>
    <!--    <Num :son-num="fatherNum" @update:sonNum="fatherNum=$event" />-->
    <h4>{{ fatherNum }}</h4>
    <Num :son-num.sync="fatherNum" />
  </div>
</template>

<script>
import Dialog from '@/views/setting/components/dialog'
import Num from '@/views/setting/components/Num'
export default {
  components: {
    Dialog,
    Num
  },

  data() {
    return {
      show: false,
      fatherNum: 1
    }
  },
  methods: {
    showDialog() {
      // this.$refs.dialog.isShow = true
      // this.show = true
      this.show = true
    }
  }
}
</script>

<style scoped>

</style>
