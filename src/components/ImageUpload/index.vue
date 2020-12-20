<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    onPreview(file) {
      console.log(file)
    }
  }
}
</script>

<style>
</style>
