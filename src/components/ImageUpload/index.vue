<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :limit="1"
      class="uploader"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="预览图片" :visible.sync="showDialog" />
  </div>

</template>

<script>
export default {
  data() {
    return {
      fileList: [{
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608375246691&di=a35d6a6212159f60d18a8396d1ec8e20&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F36%2F15%2F5b8dd7ac4164e_610.jpg'
      }], // 文件列表
      showDialog: false
    }
  },
  methods: {
    onPreview(file) {
      console.log(file)
      this.showDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
.uploader {
  ::v-deep img {
    object-fit: cover;
  }
}
.disable {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
