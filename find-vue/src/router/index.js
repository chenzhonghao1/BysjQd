import Vue from 'vue'
import Router from 'vue-router'

// 导入刚才编写的组件
import UserHome from '@/components/user/home'
import AdminHome from '@/components/admin/home'
import UserIndex from '@/components/user/Userindex'
import Person from '@/components/user/Person'
import Fabu from '@/components/user/Fabu'
import Fabuzhaoling from '@/components/user/Fabuzhaoling'
import Fabushiwu from '@/components/user/Fabushiwu'
import Chaxun from '@/components/user/Chaxun'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  //路由配置
  // 下面都是固定的写法
  
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    //需要拦截的路由中加一条元数据，设置一个 requireAuth 字段（用于store/index.js时登录拦截器）
    {
      path: '/userhome',
      name: 'UserHome',
      component: UserHome,
      redirect: '/userindex',
      children: [
        {
          path: '/userindex',
          name: 'UserIndex',
          component: UserIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/person',
          name: 'Person',
          component: Person
        },
        {
          path: '/fabu',
          name: 'Fabu',
          component: Fabu,
          redirect: '/fabushiwu',
          children:[
            {
              path:'/fabuzhaoling',
              name:'Fabuzhaoling',
              component:Fabuzhaoling
            },
            {
              path:'/fabushiwu',
              name:'Fabushiwu',
              component:Fabushiwu
            }
          ]
        },
        {
            path: '/chaxun',
            name: 'Chaxun',
            component: Chaxun
        }

      ]
    },
    {
      path: '/adminhome',
      name: 'AdminHome',
      component: AdminHome,
      meta: {
        requireAuth: true
      }
    }
  ]
})

