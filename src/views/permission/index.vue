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
      <el-table :data="list">
        <el-table-column label="权限名称" width="140px" prop="name" />
        <el-table-column align="center" label="权限标识" prop="code" />
        <el-table-column align="center" label="权限描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="primary" size="mini">添加</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getPermissionList } from '@/api/permission'
import { convertTreeData } from '@/utils/index'
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
      this.list = convertTreeData(await getPermissionList(), '0')
      console.log(this.list)
    }
  }

}
</script>

<style>

</style>
