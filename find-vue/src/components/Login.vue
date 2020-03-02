<template>
    <body id="poster">
   <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">失物招领系统</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.sjhm"
                auto-complete="off" placeholder="手机号码" prefix-icon="el-icon-phone-outline"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码" prefix-icon="el-icon-key" clearable show-password></el-input>
    </el-form-item>
    
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="handleCommand">注册</el-button>
    </el-form-item>
  </el-form>
  
  </body>
</template>

<script>
import {mapMutations} from "vuex";
  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          sjhm: '',
          password: ''
        },
        responseResult: []
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      login () {
        if (!this.loginForm.sjhm) {
          this.$alert('账号不能为空', '登录失败', {
          confirmButtonText: '确定'
        });
        }else if (!this.loginForm.password) {
          this.$alert('密码不能为空', '登录失败', {
          confirmButtonText: '确定'
        });
        }else{
          var _this = this
        console.log(this.$store.state)
        this.$axios
          .post('/login', {
            sjhm: this.loginForm.sjhm,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              // var data = this.loginForm
              //_this.$store.commit('login', _this.loginForm)
              //console.log(successResponse.data)
              this.changeLogin({ Authorization:successResponse.data.token,sjhm:this.loginForm.sjhm});
              var path = this.$route.query.redirect
              if (successResponse.data.flag === '1'){
                this.$router.replace({path: path === '/' || path === undefined ? '/userhome' : path})
              }else{
                this.$router.replace({path: path === '/' || path === undefined ? '/adminhome' : path})
              }
              
            }else if(successResponse.data.code === 400){
                  this.$alert('账号或者密码错误', '登录失败', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
            });
            }
          })
          .catch(failResponse => {
          })
        }
      },
        handleCommand() {
                this.$router.push('/register');
            }
        
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    margin-left: 250px;
    margin-top: 150px;
    margin-bottom: 90px;

  }
  
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

    #poster {
    background:url("../assets/login.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }


</style>
