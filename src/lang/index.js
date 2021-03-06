import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import langZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
import Cookies from 'js-cookie'
import en from './en'
import zh from './zh'
const lang = Cookies.get('lang')
Vue.use(VueI18n)

export default new VueI18n({
  messages: {
    en: {
      hello: 'hello',
      dashboard: 'Dashboard',
      departments: 'departments',
      settings: 'settings',
      approvals: 'approvals',
      employees: 'employees',
      permission: 'permission',
      attendances: 'attendances',
      salarys: 'salarys',
      social_securitys: 'social_securitys',
      ...langEN,
      route: {
        dashboard: 'Dashboard'
      },
      ...en
    },
    cn: {
      hello: '你好',
      dashboard: '首页',
      departments: '组织架构',
      settings: '公司设置',
      approvals: '审批',
      employees: '员工',
      permission: '权限控制',
      attendances: '考勤',
      salarys: '工资',
      social_securitys: '社保',
      ...langZH,
      route: {
        dashboard: '首页'
      },
      ...zh
    }
  },
  locale: lang

})
