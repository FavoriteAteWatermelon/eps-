import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout'
// import chartsRouter from './modules/charts'
Vue.use(Router)
/* eslint-disable */
export const routes = [

  // 跟跳转
  {
    path: '/',
    redirect: '/dashboard',
    name: 'home',
    hidden: true
  },
  // 首页
  {
    path: '/dashboard',
    // component: Layout,
    component: Layout,
    name: 'Dashboard',
    redirect: '/dashboard/index',
    icon: 'el-icon-data-line',
    children: [
      {
        path: '/dashboard/index',
        component: () => import('@/views/dashboard/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'el-icon-s-data'
      }

    ]
    // children: [
    //   {
    //     path: '/fae/training',
    //     component: () => import('@/views/fae/training'),
    //     name: '培訓詳情',
    //     meta: { title: '培訓詳情', icon: 'el-icon-cold-drink',nav : 'last' },
    //   },
    //   {
    //     path: '/fae/modelList',
    //     component: () => import('@/views/fae/modelList'),
    //     name: '主板清單',
    //     meta: { title: '主板清單', icon: 'el-icon-cold-drink',nav : 'last' },
    //   },
    //   {
    //     path: '/fae/trainingList',
    //     component: () => import('@/views/fae/trainingList'),
    //     name: '培訓項目',
    //     meta: { title: '培訓項目', icon: 'el-icon-cold-drink',nav : 'last' },
    //   },
    //   {
    //     path: '/fae/manager',
    //     component: () => import('@/views/fae/manager'),
    //     name: '公眾號後台',
    //     meta: { title: 'MINI', icon: 'el-icon-cold-drink',nav : 'last' },
    //   },
    //   {
    //     path: '/fae/wechat',
    //     component: () => import('@/views/fae/wechat'),
    //     name: '配備管理',
    //     meta: { title: 'FAE', icon: 'coinel-icon-service'},
    //     children: [
    //       {
    //         path: '/fae/manager/cpu',
    //         component: () => import('@/views/fae/management/cpu'),
    //         name: 'CPU',
    //         meta: { title: 'CPU', nav: 'last' }
    //       }, 
    //       {
    //         path: '/fae/manager/mem',
    //         component: () => import('@/views/fae/management/mem'),
    //         name: 'MEM',
    //         meta: { title: 'MEM', nav: 'last' }
    //       }, 
    //       {
    //         path: '/fae/manager/hdd',
    //         component: () => import('@/views/fae/management/hdd'),
    //         name: 'HDD',
    //         meta: { title: 'HDD', nav: 'last' }
    //       }, 
    //       {
    //         path: '/fae/manager/other',
    //         component: () => import('@/views/fae/management/other'),
    //         name: 'Other',
    //         meta: { title: 'Other', nav: 'last' }
    //       }, 
    //     ]
    //   }
    // ]
  },
  {
    path: '/motherboard',
    component: Layout,
    icon: 'icon iconfont icon-zhuban',
    redirect: '/board/index',
    name: 'Motherboard',
    children: [
      {
        path: '/board/index',
        component: () => import('@/views/board/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'el-icon-cpu'
      }

    ]
  },
  {
    path: '/cpu',
    component: Layout,
    icon: 'icon iconfont icon-CPU',
    redirect: '/cpu/index',
    name: 'CPU',
    children: [
      {
        path: '/cpu/index',
        component: () => import('@/views/cpu/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'el-icon-cpu'
      }

    ]
  },
  {
    path: '/mem',
    component: Layout,
    icon: 'icon iconfont icon-neicun',
    redirect: '/mem/index',
    name: 'Memory',
    children: [
      {
        path: '/mem/index',
        component: () => import('@/views/mem/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'icon iconfont icon-neicun'
      }

    ]
  },
  {
    path: '/hdd',
    component: Layout,
    icon: 'icon iconfont icon-yingpan',
    redirect: '/hdd/index',
    name: 'HDD',
    children: [
      {
        path: '/hdd/index',
        component: () => import('@/views/hdd/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'icon iconfont icon-hdd'
      }

    ]
  },
  {
    path: '/monitor',
    component: Layout,
    icon: 'icon iconfont icon-monitor',
    redirect: '/monitor/index',
    name: 'Monitor',
    children: [
      {
        path: '/monitor/index',
        component: () => import('@/views/monitor/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'icon iconfont icon-monitor'
      }

    ]
  },
  {
    path: '/power',
    component: Layout,
    icon: 'icon iconfont icon-dianyuan',
    redirect: '/power/index',
    name: 'Power',
    children: [
      {
        path: '/power/index',
        component: () => import('@/views/power/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'icon iconfont icon-monitor'
      }

    ]
  },
  {
    path: '/other',
    component: Layout,
    icon: 'el-icon-s-grid',
    redirect: '/other/index',
    name: 'Other',
    children: [
      {
        path: '/other/index',
        component: () => import('@/views/other/index'),
        name: 'index',
        meta: {nav: 'last'},
        icon: 'el-icon-s-grid'
      }

    ]
  },
  {
    path: '/user',
    component: Layout,
    icon: 'el-icon-s-custom',
    redirect: '/user/info',
    name: 'User',
    children: [
      {
        path: '/user/info',
        component: () => import('@/views/user/index'),
        name: '用戶列表',
        meta: {nav: 'last'},
        icon: 'el-icon-s-custom'
      }

    ]
  }
  // chartsRouter
]
const createRouter = () => new Router({
  // mode: 'history',
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
