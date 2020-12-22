<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头条 -->
      <PageTools>
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </PageTools>

      <!-- 下方的表格 -->
      <el-table>
        <el-table-column label="权限名称" width="140px" />
        <el-table-column align="center" label="权限标识" />
        <el-table-column align="center" label="权限描述" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text">添加</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getPermissionList } from '@/api/permission'
export default {
  components: {
    PageTools
  },
  data() {
    return {
      list: [],
      formData: {
        name: '',
        type: '',
        code: '',
        description: '',
        pid: '',
        enVisible: ''
      }
    }
  },
  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      console.log(data)
    }
  }

}
</script>

<style>

</style>
