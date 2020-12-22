<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import?type=employees')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 数据表格 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="">
            <template slot-scope="{ $index }">{{
              (pageSetting.page - 1) * pageSetting.size + 1 + $index
            }}</template>
          </el-table-column>

          <el-table-column label="姓名" sortable="" prop="username" />

          <el-table-column label="头像" align="center">
            <template slot-scope="{row}">
              <img
                slot="reference"
                v-imageerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
                @click="row.staffPhoto?showUserStaffPhoto(row.staffPhoto):showCodeDialog=false"
              >
            </template>
          </el-table-column>

          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="$router.push('/employees/detail'+ row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showRoleDialog=true">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageSetting.total"
            :page-sizes="[2, 3, 5, 10, 20]"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
        </el-row>
      </el-card>
      <!-- diglog框 -->
      <AddEmployee :show-dialog.sync="showDialog" />
      <el-dialog title="二维码" :visible.sync="showCodeDialog" @opened="showerweima">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>

      <!-- 角色框 -->
      <AssignRole :show-role-dialog="showRoleDialog" />
    </div>
  </div>
</template>

<script>
import QRcode from 'qrcode'
import { formatDate } from '@/filters'

import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'

import AssignRole from './detail/components/assign-role'
import { getRoleList } from '@/api/setting'

export default {
  components: {
    AddEmployee,
    AssignRole
  },
  data() {
    return {
      showCodeDialog: false,
      showRoleDialog: false,
      list: [],
      pageSetting: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false,
      imageUrl: ''
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工详情
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.pageSetting)
      rows.shift()
      this.list = rows
      this.pageSetting.total = total - 1
    },
    // 将数字转为聘请方式
    formatEmployment(row, cplumn, cellvalue, index) {
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellvalue)
      return obj ? obj.value : '其他'
    },
    // 当前页码改变
    async currentChange(newCurrent) {
      this.pageSetting.page = newCurrent
      await this.getEmployeeList()
    },
    // 页面条数改变
    async sizeChange(newSize) {
      this.pageSetting.size = newSize
      await this.getEmployeeList()
    },
    // 删除员工
    async delEmployee(id) {
      try {
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    // 导出数据函数
    async exportData() {
      try {
        const excel = await import('@/vendor/Export2Excel')
        console.log(excel)

        const headersEnum = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }

        const header = Object.keys(headersEnum)
        // console.log(header)
        // 发送页码
        const pageSettings = {
          page: 1,
          size: this.pageSetting.size
        }
        // 调用获取员工方法
        const { rows } = await getEmployeeList(pageSettings)
        const data = rows.map(item => {
          const newItem = this.obj2Array(item, headersEnum)
          return newItem
        })
        excel.export_json_to_excel({ header, data })
      } catch (error) {
        console.log(error)
      }
    },
    obj2Array(item, dictionary) {
      const array = []
      for (const key in dictionary) {
        const newKey = dictionary[key]
        let value = item[newKey]
        // 利用过滤器过滤时间
        if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
          value = formatDate(value)
        }
        // 修改聘用形式
        if (newKey === 'formOfEmployment') {
          const obj = EmployeeEnum.hireType.find(item => item.id === value)
          value = obj ? obj.value : '临时工战士'
        }
        console.log(newKey, 'key--------------')
        console.log(value, 'value--------------')
        array.push(value)
        // 数字里只放value，相当于一个用户的所有数据
        console.log(array, '-------------------------------------')
      }
      return array
    },
    // 点头像 弹出显示框
    showUserStaffPhoto(imgURl) {
      this.showCodeDialog = true
      this.imageUrl = imgURl
    },
    // 显示二维码
    showerweima() {
      QRcode.toCanvas(this.$refs.myCanvas, this.imageUrl)
    },
    //  获取所有角色
    async getRoleList() {
      const { rows } = await getRoleList()
      console.log(rows)
      this.list = rows
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep img {
  object-fit: cover;
}
</style>
