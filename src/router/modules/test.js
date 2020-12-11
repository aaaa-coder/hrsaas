import Layout from '@/layout'
export default {
  path: '/test',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/test/index'),
    meta: { title: '测试页' }
  }]
}
