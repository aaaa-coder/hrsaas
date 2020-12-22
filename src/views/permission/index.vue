<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头条 -->
      <PageTools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
        </template>
      </PageTools>

      <!-- 下方的表格 -->
      <el-table :data="list" row-key="id" border="" :default-expand-all="true">
        <el-table-column label="权限名称" width="180px" prop="name" />
        <el-table-column align="center" label="权限标识" prop="code" />
        <el-table-column align="center" label="权限描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :visible="showDialog" title="新增">
        <!-- 表单 -->
        <el-form label-width="120px" :data="formData">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
            <el-button size="small">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getPermissionList, addPermission } from '@/api/permission'
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
        type: 1,
        code: '',
        description: '',
        pid: '',
        enVisible: ''
      },
      showDialog: false
    }
  },
  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      this.list = convertTreeData(await getPermissionList(), '0')
    },
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    btnOk() {
      try {
        const data = addPermission(this.formData)
        console.log(data)
        this.$message.success('权限添加成功')
        this.getPermissionList()
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    }

  }

}
</script>

<style>

</style>
