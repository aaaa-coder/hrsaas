<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ data.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
import { Message } from 'element-ui'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean
    }
  },

  methods: {
    operateDepts(operate) {
      if (operate === 'add') {
        // console.log('add')
        this.$emit('addDepts', this.data)
      }
      if (operate === 'edit') {
        console.log('edit')
      }
      if (operate === 'del') {
        this.$confirm('确定要删除该部门吗', '删除部门', {
          confirmButtonText: '毁灭吧，赶紧的',
          cancelButtonText: '我觉得我还能再抢救一下',
          type: 'warning'
        })
          .then(async() => {
            try {
              await delDepartments(this.data.id)
              Message.success('删除部门成功')
              this.$emit('update:showDialog', false)
              this.$emit('loadPage')
            } catch (error) {
              console.log(error)
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style>
</style>
