<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="manage">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" size="small">+增加角色</el-button>
            <el-table
              :data="list"
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="序号"
                width="160"
              >
                <template slot-scope="scope">
                  {{ scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="160"
              />
              <el-table-column
                prop="description"
                label="描述"
              />
              <el-table-column
                label="操作"
                width="200"
              >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button></el-table-column>
            </el-table>

            <el-row type="flex" justify="end" align="bottom" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination layout="prev,pager,next" :total="total" />
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="公司管理" name="company">
            123
            <el-tab-pane label="公司信息">
              <el-alert
                title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
                type="info"
                show-icon
                :closable="false"
              />
              <el-form label-width="160px" style="margin-top:50px">
                <el-form-item label="公司名称">
                  <el-input disabled style="width:400px" />
                </el-form-item>
                <el-form-item label="公司地址">
                  <el-input disabled style="width:400px" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input disabled style="width:400px" />
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :rows="3" disabled style="width:400px" />
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
export default {
  data() {
    return {
      manage: 'role',
      list: [],
      pageInfo: {
        page: 1,
        pagesize: 10
      },
      total: null
    }
  },
  created() {
    this.getRoleList(this.pageInfo)
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.total = total
      this.list = rows
      console.log(rows)
    }
  }
}
</script>

<style>

</style>
