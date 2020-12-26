import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import langZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
Vue.use(VueI18n)

export default new VueI18n({
  messages: {
    en: {
      hello: 'hello',
      Dashboard: 'Dashboard',
      departments: '组织departments',
      settings: '公司settings',
      approvals: 'approvals',
      employees: 'employees',
      permission: '权限permission',
      attendances: 'attendances',
      salarys: 'salarys',
      social_securitys: 'social_securitys',
      ...langEN
    },
    cn: {
      hello: '你好',
      Dashboard: '首页',
      departments: '组织架构',
      settings: '公司设置',
      approvals: '审批',
      employees: '员工',
      permission: '权限控制',
      attendances: '考勤',
      salarys: '工资',
      social_securitys: '社保',
      ...langZH
    }
  },
  locale: 'en'

})
