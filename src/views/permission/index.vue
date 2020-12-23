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
            <el-button type="primary" size="mini" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="primary" size="mini" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :visible="showDialog" :title="title" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="permForm" label-width="120px" :data="formData" :rules="rules" :model="formData">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
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
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getPermissionList, addPermission, getPermissionDetail, updatePermission, delPermission } from '@/api/permission'
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
      showDialog: false,
      rules: {
        name: [{ required: true, trigger: 'blur', message: '权限名不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '权限标识不能为空' }],
        description: [
          { required: true, message: '权限描述不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 5, max: 300, message: '权限描述字数在5-300之间' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑权限' : '增加权限'
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
    async editPermission(id) {
      this.showDialog = true
      this.formData = await getPermissionDetail(id)
    },
    async delPermission(id) {
      try {
        await delPermission(id)
        this.$message.success('删除权限成功')
        this.getPermissionList()
      } catch (error) {
        console.log(error)
      }
    },
    async btnOk() {
      try {
        this.$refs.permForm.validate()
        if (this.formData.id) {
          await updatePermission(this.formData)
          this.$message.success('修改权限成功')
        } else {
          await addPermission(this.formData)
          this.$message.success('权限添加成功')
        }
        this.getPermissionList()
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.formData = {
        name: '',
        type: 1,
        code: '',
        description: '',
        pid: '',
        enVisible: ''
      }
      this.$refs.permForm.resetFields()
      this.getPermissionList()
      this.showDialog = false
    }

  }

}
</script>

<style>

</style>
