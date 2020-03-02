import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'



// 设置反向代理，前端请求默认发送到 http://localhost:8888/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8888/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false



Vue.use(ElementUI)

//钩子函数及在某些时机会被调用的函数
//使用钩子函数beforeEach判断是否拦截
//首先判断访问的路径是否需要登录，如果需要，
//判断 store 里有没有存储 user 的信息，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页）
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.Authorization) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.token = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,   //import store from './store'，拿到/store下index.js的内容
  components: { App },  //components下的APP.vue
  template: '<App/>' //起模板是什么呢？模板就是组件App.vue中的template中的内容。（template会替代原来的的挂载点处的内容）
})

