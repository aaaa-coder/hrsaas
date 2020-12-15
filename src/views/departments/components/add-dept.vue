<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" :model="formData" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployees"
        >
          <el-option
            v-for="person in people"
            :key="person.id"
            :label="person.username"
            :value="person.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, addDepartments, getDeptDetails, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
import { Message } from 'element-ui'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const validateDeptsName = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // value是输入的值
      // console.log(value)
      // 判断是不是同名同父
      if (this.formData.id) {
        depts.some((dept) => dept.id !== this.formData.id && dept.name === value && dept.pid === this.treeNode.id)
          ? callback(new Error('同一个部门下部门名不能相同'))
          : callback()
      } else {
        depts.some((dept) => dept.name === value && dept.pid === this.treeNode.id)
          ? callback(new Error('同一个部门下部门名不能相同'))
          : callback()
      }
    }
    const validateDeptsCode = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // value是输入的值
      // console.log(value)
      // 值不能相同的情况下，还要确保有值
      if (this.formData.id) {
        depts.some((dept) => dept.id !== this.formData.id && dept.code === value && value)
          ? callback(new Error('同一个部门下部门名不能相同'))
          : callback()
      } else {
        depts.some((dept) => dept.code === value && value)
          ? callback(new Error('同一个部门下部门名不能相同'))
          : callback()
      }
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      people: [],
      rules: {
        name: [
          { required: true, message: '部门名不能为空', trigger: 'blur' },
          { message: '部门名应该在1-50之间', min: 1, max: 50, trigger: 'blur' },
          { trigger: 'blur', validator: validateDeptsName }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            message: '部门编码应该在1-50之间',
            min: 1,
            max: 50,
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validateDeptsCode }
        ],
        manager: [{ required: true, trigger: 'change' }],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            message: '部门名应该在1-300之间',
            min: 1,
            max: 300,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployees() {
      this.people = await getEmployeeSimple()
    },
    btnOk() {
      this.$refs.form.validate(async(isOk) => {
        if (isOk) {
          try {
            if (this.formData.id) {
              console.log(this.formData)
              await updateDepartments(this.formData)
              Message.success('部门修改成功')
            } else {
              await addDepartments({ ...this.formData, pid: this.treeNode.id })
              Message.success('部门添加成功')
            }
            this.$emit('addDepts')
            this.$emit('update:showDialog', false)
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    },

    async getDeptDetails() {
      this.formData = await getDeptDetails(this.treeNode.id)
    }
  }
}
</script>

<style>
</style>
