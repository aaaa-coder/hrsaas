<template>
  <!-- 公共导入组件 -->
  <uploadExcel :on-success="onSuccess" />
</template>

<script>
import uploadExcel from '@/components/UploadExcel'
import { importEmployee } from '@/api/employees'
export default {
  components: {
    uploadExcel
  },

  methods: {
    async onSuccess({ header, results }) {
      const dictionary = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      //   console.log(header)
      //   console.log(results)
      const data = results.map(item => {
        return this.cnToEn(item, dictionary)
      })
      console.log(data)
      await importEmployee(data)
      this.$message.success('数据导入成功')
      setTimeout(() => {
        this.$router.push('/employees')
      }, 1000)
    },
    cnToEn(item, dictionary) {
      const newItem = {}
      //   Object.keys(item)
      //   console.log(Object.keys(item))
      // 换一种思路
      //   Object.keys(item).forEach(word => {
      //     // console.log(dictionary[word], '------')
      //     // console.log(item[word])
      //     newItem[dictionary[word]] = item[word]
      //   })
      for (const key in item) {
        const newKey = dictionary[key]
        let newValue = item[key]
        if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
          const formatDate = this.formatDate(newValue, '/')
          newValue = new Date(formatDate)
        }
        newItem[newKey] = newValue
      }
      return newItem
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
