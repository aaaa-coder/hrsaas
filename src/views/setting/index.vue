<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="manage">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" size="small" @click="addRole">+增加角色</el-button>
            <el-table :data="list" style="width: 100%">
              <el-table-column label="序号" width="160">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="editPerm(scope.row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(scope.row.id)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRoleById(scope.row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row
              type="flex"
              justify="end"
              align="bottom"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage"
                :page-size="5"
                :page-sizes="[2, 3, 5, 10, 20]"
                @size-change="sizeChange"
                @current-change="currentChange"
              />
              <!-- 角色弹框 -->
              <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
                <el-form ref="roleForm" :model="roleForm" label-width="120px">
                  <el-form-item label="角色名称" prop="name">
                    <el-input v-model="roleForm.name" />
                  </el-form-item>
                  <el-form-item label="角色描述">
                    <el-input v-model="roleForm.description" />
                  </el-form-item>
                </el-form>
                <!-- 底部 -->
                <el-row slot="footer" type="flex" justify="center">
                  <el-col :span="6">
                    <el-button size="small" @click="btnCancel">取消</el-button>
                    <el-button size="small" type="primary" @click="btnOk">确定</el-button>
                  </el-col>
                </el-row>
              </el-dialog>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="160px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="companyInfo.companyPhone" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyInfo.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                  resize="none"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
      <!-- 权限弹窗 -->
      <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
        <!-- 权限是一颗树 -->
        <!-- 将数据绑定到组件上 -->
        <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
        <!-- id作为唯一标识 -->
        <el-tree
          ref="permTree"
          :data="permList"
          :props="{label:'name'}"
          :default-expand-all="true"
          :show-checkbox="true"
          node-key="id"
          :default-checked-keys="selectCheck"
          :check-strictly="true"
        />
        <!-- 确定 取消 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="small" @click="btnAddPerm">确定</el-button>
            <el-button size="small" @click="btnPermCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deleteRole, getCompanyInfo, getRoleDetail, getRoleList, updateRole, addRole, assignPerm } from '@/api/setting'

import { getPermissionList } from '@/api/permission'
import { convertTreeData } from '@/utils'
export default {
  data() {
    return {
      roleId: '',
      permList: [],
      selectCheck: [],
      showPermDialog: false,
      manage: 'role',
      list: [],
      pageInfo: {
        page: 1,
        pagesize: 10
      },
      totalPage: 0,
      companyInfo: {},
      roleForm: {
        name: '',
        description: ''
      },
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    title() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },

  watch: {
    companyId: {
      // 从其他页面跳转就执行
      handler() {
        if (this.companyId) {
          this.getCompanyInfo()
        }
      },
      immediate: true
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.pageInfo)
      this.totalPage = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
    },
    // 条数改变
    sizeChange(newSize) {
      this.pageInfo.pagesize = newSize
      this.getRoleList()
    },
    // 页码改变
    currentChange(newPage) {
      this.pageInfo.page = newPage
      this.getRoleList()
    },
    // 删除角色
    async delRoleById(id) {
      try {
        await this.$confirm('确认删除该角色吗', '删除角色', {
          confirmButtonText: '毁灭吧，赶紧的',
          cancelButtonText: '我觉得我还能再抢救一下',
          type: 'warning'
        })
        // 只有点击了确定 才能进入到下方
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑角色
    async editRole(id) {
      this.showDialog = true
      this.roleForm = await getRoleDetail(id)
    },
    // 获取角色详情
    async btnOk() {
      try {
        this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
          this.$message.success('修改成功')
        } else {
          await addRole(this.roleForm)
          this.$message.success('增加成功')
        }
        this.showDialog = false
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async addRole() {
      this.showDialog = true
    },
    async editPerm(id) {
      try {
        // 先保存id
        this.roleId = id
        // 获取权限列表
        const data = await getPermissionList(id)
        this.permList = convertTreeData(data, '0')
        // 获取点击的id
        const { permIds } = await getRoleDetail(id)
        this.selectCheck = permIds
      } catch (error) {
        console.log(error)
      }
      this.showPermDialog = true
    },
    async btnAddPerm() {
      try {
        const id = this.roleId
        // 调用树形组件的获取id方法
        const permIds = this.$refs.permTree.getCheckedKeys()
        await assignPerm({ id: id, permIds: permIds })
        this.$message.success('分配权限成功')
        this.showPermDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnPermCancel() {
      this.selectCheck = []
      this.showPermDialog = false
    }
  }
}
</script>

<style>
</style>

