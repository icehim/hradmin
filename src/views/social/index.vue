<template>
  <div>
    <!--
      上传组件
      action：上传的接口地址
      show-file-list:是否显示上传文件列表
      on-success:上传成功的的回调(非自定义上传)
      before-upload:上传前的回调
        作用:上传前的限制(比如限制  文件大小与格式...)
        return true 正常上传return false:中止上传
        http-request:自定义上传  function(res){res.file（上传文件对象）}

      腾讯云的使用
      1:安装插件
          npm i cos-js-sdk-v5
      2：导入
          import COS from 'cos-js-sdk-v5'
      3:实例化需要取出自己注册的腾讯云密钥
          const cos=new COS({
            SecretId: "AKIDNXR8bpeSF1JL8EyZopxRfdHgqGUeuEn8",
            SecretKey: "HJ9mAbQEn7jgjY9swEI6yAamk7MN8hty"
          })
      4:使用
        cos.putObject({
        Bucket: 'dhf481229-1305249343', /* 必须：存储桶，使用自己注册的存储桶 */
        Region: 'ap-guangzhou',     /* 存储桶所在地域，必须字段 */
        Key: file.uid+'',              /* 必须，要求是字符串 */
        StorageClass: 'STANDARD',   // 固定，不用修改
        Body: file, // 上传文件对象
        onProgress: (progressData)=> {
          // 上传进度
            console.log(JSON.stringify(progressData));
            }
        }, (err, data)=>{
          // 上传成功的回调  err:代表错误，没有错误就代表成功  data：上传成功的接口返回值
            console.log(err || data);
        });
    -->
    <h3>上传地址:{{ imgUrl }}</h3>
    <UploadImg v-model="imgUrl" />
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import UploadImg from '@/components/lib/uploadImg'
const cos = new COS({
  SecretId: 'AKIDNXR8bpeSF1JL8EyZopxRfdHgqGUeuEn8',
  SecretKey: 'HJ9mAbQEn7jgjY9swEI6yAamk7MN8hty'
})

export default {
  components: { UploadImg },
  data() {
    return {
      imgUrl: 'http://dhf481229-1305249343.cos.ap-guangzhou.myqcloud.com/1665410013295',
      imageUrl: ''
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isPng = file.type === 'image/jpeg'
      if (!isPng) {
        this.$message.error('请上传jpeg')
      }
      return file
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
    },
    httpRequest(res) {
      cos.putObject({
        Bucket: 'dhf481229-1305249343', /* 必须：存储桶，使用自己注册的存储桶 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: res.file.uid + '', /* 必须，要求是字符串 */
        StorageClass: 'STANDARD', // 固定，不用修改
        Body: res.file, // 上传文件对象
        onProgress: (progressData) => {
          // 上传进度
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // 上传成功的回调  err:代表错误，没有错误就代表成功  data：上传成功的接口返回值
        console.log(err || data)
        this.imageUrl = 'http://' + data.Location
      })
    }
  }
}
</script>
<style lang="scss">
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
</style>
