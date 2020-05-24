import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,

  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: () => import('./pages/NotFound.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('./pages/Home.vue')
    },
    {
      path: '/names',
      name: 'Names',
      component: () => import('./pages/Names.vue')
    },
    {
      path: '/names/:id',
      name: 'Name',
      component: () => import('./pages/Name.vue'),
      props: route => ({
        id: route.params.id
      })
    }
  ]
})
