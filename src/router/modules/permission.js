import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/permission/index'),
    meta: { title: '权限管理', icon: 'lock' }
  }]
}

