<template>
  <div class="uploadExcel">
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    >
    <div class="left">
      <el-button
        :loading="loading"
        style="margin-left: 16px"
        size="mini"
        type="primary"
        @click="handleUpload"
      >
        点击上传
      </el-button>
    </div>
    <div
      class="right"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      <span>将文件拖到此处</span>
    </div>
    <!--    <div-->
    <!--      class="drop"-->
    <!--      @drop="handleDrop"-->
    <!--      @dragover="handleDragover"-->
    <!--      @dragenter="handleDragover"-->
    <!--    >-->
    <!--      Drop excel file here or-->
    <!--      <el-button-->
    <!--        :loading="loading"-->
    <!--        style="margin-left: 16px"-->
    <!--        size="mini"-->
    <!--        type="primary"-->
    <!--        @click="handleUpload"-->
    <!--      >-->
    <!--        Browse-->
    <!--      </el-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'UpdateExcel',
  props: {
    beforeUpload: Function, // eslint-disable-line
    // 方法要返回boolean值，它可以定义解析excel前的限制条件，比如文件大小，太大不解析
    onSuccess: Function // eslint-disable-line
    // 拿到解析excel后的回调函数
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      //  如果有success方法，执行success方法并传入读取的数据
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        // 只支持一个文件拖入
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        // 只支持excel文件
        this.$message.error(
          'Only supports upload .xlsx, .xls, .csv suffix files'
        )
        return false
      }
      // 开始解析excel
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        // 如果父组件没有传入beforeUpload就直接解析excel
        this.readerData(rawFile)
        return
      }
      // 如果传入了beforeUpload,它执行后要返回一个boolean值，如果boolean为true才开始解析
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    // 解析excel
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          // header头部数据  results:列表数据
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style lang="scss" scoped>
/*.excel-upload-input {*/
/*  display: none;*/
/*  z-index: -9999;*/
/*}*/
/*.drop {*/
/*  border: 2px dashed #bbb;*/
/*  width: 600px;*/
/*  height: 160px;*/
/*  line-height: 160px;*/
/*  margin: 0 auto;*/
/*  font-size: 24px;*/
/*  border-radius: 5px;*/
/*  text-align: center;*/
/*  color: #bbb;*/
/*  position: relative;*/
/*}*/
.uploadExcel{
  display: flex;
  width: 800px;
  margin: 0 auto;
  border: 1px dashed #ccc;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .left{
    flex: 1;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px dashed #ccc;
  }
  .right{
    flex: 1;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
