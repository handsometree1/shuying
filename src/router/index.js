import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
const HelloWorld = () => import('@/components/HelloWorld')
const Fine =()=>import('@/components/Fine')
const Login =()=>import('@/components/Login')
const MainPage =()=>import('@/components/MainPage')
const User =()=>import('@/components/User')
const Course =()=>import('@/components/Course')
Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Fine',
      name: 'Fine',
      component: Fine
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      redirect:"User",
      children: [
        {path: '/User', name: 'User', component: User},
        {path: '/Course', name: 'Course', component: Course},
      ]
    }
  ]
})
