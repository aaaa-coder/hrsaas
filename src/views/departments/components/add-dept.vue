<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form :model="formData" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input :model="rules.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input :model="rules.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <!-- <el-form-item label="部门负责人" >
        <el-select style="width:80%" placeholder="请选择" :model="rules.manager"/>
      </el-form-item> -->
      <el-form-item label="部门介绍" prop="introduce">
        <el-input :model="rules.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''

      },
      rules: {
        name: [
          { required: true, message: '部门名不能为空', trigger: 'blur' },
          { message: '部门名应该在1-50之间', min: 1, max: 50, trigger: 'blur' }
        ],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { message: '部门编码应该在1-50之间', min: 1, max: 50, trigger: 'blur' }],
        manager: [{ required: true, trigger: 'change' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { message: '部门名应该在1-300之间', min: 1, max: 300, trigger: 'blur' }]
      }
    }
  }
}
</script>

<style>

</style>
