import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Unfind from '@/page/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '溯源档案'
      }
    },
    {
      path: '/Unfind',
      component: Unfind
    }
  ]
})
