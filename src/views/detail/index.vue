<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="employeesInfo">
        <el-tab-pane label="登录账户管理" name="acount">用户管理</el-tab-pane>
        <el-tab-pane label="个人详情" name="detail">配置管理</el-tab-pane>
        <el-tab-pane label="岗位详情" name="job">角色管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeesInfo: 'acount'
    }
  }
}
</script>

<style>

</style>
