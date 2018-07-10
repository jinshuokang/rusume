import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/page/default'
import Unfind from '@/page/404'
import Home from '@/page/home'

Vue.use(Router)

export default new Router({
  routes: [
    // 默认选择主题页面
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { require: true }
    },
    // 404
    {
      path: '/404',
      component: Unfind
    },
    // 默认主题
    {
      path: '/default',
      name: 'default',
      component: Default
    }
  ]
})
