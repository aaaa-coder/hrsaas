<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs>
        <el-tab-pane label="组织架构" />
        <el-card class="tree-card">
          <!-- 用了一个行列布局 -->
          <TreeTools :data="company" :is-root="true" />
          <!-- 卡片内的树 -->
          <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
            <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
            <TreeTools slot-scope="{data}" :data="data" />
            <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          </el-tree>
        </el-card>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { convertTreeData } from '@/utils'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      // 本来组织结构的数据应该从服务器获取,
      // 但是现在先不管, 写死数据作为测试
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        name: '',
        manager: ''
      }
    }
  },
  created() {
    getDepartments().then(res => {
      console.log(res)
      this.company = {
        name: res.companyName,
        manager: '负责人'
      }
      this.departs = convertTreeData(res.depts, '')
    })
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
