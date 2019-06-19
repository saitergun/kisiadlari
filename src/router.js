import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '*', component: () => import('./views/NotFound.vue') },
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/names', component: () => import('./views/Names.vue') },
    { path: '/names/:id', component: () => import('./views/Name.vue'), props: route => ({ id: route.params.id }) }
  ]
})
