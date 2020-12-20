<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="employeesInfo">
        <el-tab-pane label="登录账户管理" name="acount">
          <el-row type="flex" justify="center" align="middle" style="padding-right: 300px">
            <el-form ref="userForm" :model="userInfo" :rules="rules">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="新密码:" prop="newPassword">
                <el-input v-model="userInfo.newPassword" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById">更新</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="个人详情" name="detail">
          <component :is="UserInfoName" />
        </el-tab-pane>

        <el-tab-pane label="岗位详情" name="job"><component :is="JobInfoName" /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      UserInfoName: 'UserInfo',
      JobInfoName: 'JobInfo',
      employeesInfo: 'acount',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        newPassword: '*******'
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '姓名不能为空' }],
        newPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 6, max: 12, message: '密码位数必须要在6-12之间' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    // 获取用户详情
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUserDetailById() {
      try {
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.newPassword })
        this.$message.success('用户信息保存成功')
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style>

</style>
