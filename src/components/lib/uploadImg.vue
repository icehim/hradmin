<template>
  <div class="uploadImg">
    <!--
      1.实现上传使用腾讯云
        a：样式
        b:调用腾讯云
        c:上传并显示
      2.实现v-model:可以拿到上传地址
        子组件 :value="父组件属性的图片地址" @input="父组件属性的图片地址=$event"
        子组件内:
          props:['value']
          model:{
            prop:'value',
            event:'input'
          }
          this.$emit('input',修改后的地址)
      3.实现删除功能
        a:样式
        b:绑定删除事件清空图片地址
      4.实现预览
        a:创建弹框
        b:点击图片是显示弹框
        c:弹框内显示大图片
        d:弹框可关闭
      5.实现进度条
    -->
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
    >
      <img v-if="value" v-globalImageError="defaultImg" :src="value" class="avatar" @click.stop.prevent="isShow=true">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <!--删除按钮-->
    <div v-if="value" class="del" @click="del">X</div>
    <!--预览-->
    <el-dialog title="图片预览" width="500px" :visible.sync="isShow">
      <img style="width: 100%" :src="value" alt="">
    </el-dialog>
    <!--
    进度条
    Vue动画
      transition
      动画条件:进入与离开动作
    使用:
    1.用transition包住，name:'css前缀xxx'
    2
    .xxx-enter-active:进入过程中一直存在状态，用于进入动画的执行体，承载transition与animation
    .xxx-leave-active:离开动画执行体，承载transition与animation
    .xxx-enter:进入前状态，进入过程中希望从什么状态变到正常状态
    .xxx-leave-to:离开时状态，离开时希望从正常状态变到什么状态
    -->
    <transition name="fade">

      <el-progress v-if="loading" :percentage="percentage" />

    </transition>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDNXR8bpeSF1JL8EyZopxRfdHgqGUeuEn8',
  SecretKey: 'HJ9mAbQEn7jgjY9swEI6yAamk7MN8hty'
})
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // imageUrl: ''
      isShow: false,
      percentage: 0,
      loading: false,
      defaultImg: require('@/assets/common/head.jpg')
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      return true
    },
    httpRequest(res) {
      this.loading = true
      this.percentage = 0
      cos.putObject({
        Bucket: 'dhf481229-1305249343', /* 必须：存储桶，使用自己注册的存储桶 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: res.file.uid + '', /* 必须，要求是字符串 */
        StorageClass: 'STANDARD', // 固定，不用修改
        Body: res.file, // 上传文件对象
        onProgress: (progressData) => {
          // 上传进度
          this.percentage = progressData.percent * 100
          if (progressData.percent === 1) {
            this.loading = false
          }
        }
      }, (data) => {
        // 上传成功的回调  err:代表错误，没有错误就代表成功  data：上传成功的接口返回值
        // console.log(err || data)
        this.$emit('input', 'http://' + data.Location)
        // this.imageUrl = 'http://' + data.Location
      })
    },
    // 删除
    del() {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.uploadImg {
  position: relative;
  width: 178px;
  //& 在scss中代表引用父元素
  &:hover {
    .del {
      display: block;
    }
  }

  .del {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    display: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(-100px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
