<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        测试
      </h2>
      <component :is="ImageUploadName" />
    </div>
  </div>
</template>

<script>
import ImageUpload from '@/components/ImageUpload'
export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      ImageUploadName: 'ImageUpload'
    }
  }
}
</script>

<style>

</style>
