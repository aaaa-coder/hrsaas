<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item+'年'" :value="item">{{ item }}年</el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;margin-left:10px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item+'月'" :value="item">{{ item }}月</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="scope" class="content">
        <div class="date-content">
          <span class="text"> {{ scope.data.day | getDay }}</span>
          <span v-if="isRest(scope.date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(date) {
      console.log(date) // yyyy-mm-dd 拿到dd
      const day = date.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null,
      yearList: []
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1 // 初始为0
    // 根据当前的年 生成可选年份 前后各加5年
    this.yearList = Array.from(Array(11), (value, index) => this.currentYear + index - 5)
    // 计算 当年当月的第一个周一 再加上 四周之后的一个月月份
    this.dateChange()
  },
  methods: {
    // 是否是休息日
    isRest(date) {
    //   console.log(date) //返回一个月的日期
      const restDays = [3, 4, 5, 7, 9] // 设置休息时间
      const currentDate = date.getDate()
      //   return date.getDay() === 6 || date.getDay() === 0
      return restDays.indexOf(currentDate) > -1
    },
    // 年月份改变之后
    dateChange() {
      const year = this.currentYear
      const month = this.currentMonth
      this.currentDate = new Date(`${year}-${month}-1`) // 以当前月的1号为起始
    }
  }
}
</script>

<style lang='scss' scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
