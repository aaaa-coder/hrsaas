import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail:id',
      hidden: true,
      component: () => import('@/views/detail'),
      meta: { title: '员工详情' }
    }
  ]
}

