import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//登录拦截器
//localStorage，即本地存储，在项目打开的时候会判断本地存储中是否有 user 这个对象存在，
//如果存在就取出来并获得 username 的值，否则则把 username 设置为空。这样我们只要不清除缓存，登录的状态就会一直保存。
export default new Vuex.Store({
  state: {
     // 存储token
     Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    // login (state, user) {
    //   state.user = user
    //   window.localStorage.setItem('user', JSON.stringify(user))
    // },
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      localStorage.setItem('sjhm', user.sjhm);
      localStorage.setItem('Authorization', user.Authorization);
    },
    logout (state) {
      state.user = []
      window.localStorage.removeItem('Authorization')
    }

  }
})
