<template>
    <div class="register">
        <div class="box">
            <div class="content">
                <div class="nav">
                    <h3 class="active">新用户注册</h3>
                </div>
                <el-form>
                    <el-input
                            placeholder="用户名"
                            prefix-icon="el-icon-edit-outline"
                            v-model="username"
                            clearable
                            @blur="check_username">
                    </el-input>
                    <el-input
                            placeholder="手机号码"
                            prefix-icon="el-icon-phone-outline"
                            v-model="mobile"
                            clearable
                            @blur="check_mobile">
                    </el-input>
                    <el-input
                            placeholder="密码"
                            prefix-icon="el-icon-key"
                            v-model="password"
                            clearable
                            show-password>
                    </el-input>
                    <!--
                    <el-input
                            placeholder="验证码"
                            prefix-icon="el-icon-chat-line-round"
                            v-model="sms"
                            clearable>
                        <template slot="append">
                            <span class="sms" @click="send_sms">{{ sms_interval }}</span>
                        </template>
                    </el-input>
                    -->
                    <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">注册</el-button>
                    <div class="foot">
                        <span @click="go_login">立即登录</span>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Register",
        data() {
            return {
                username:'',
                mobile: '',
                password: '',
                sms: '',
                sms_interval: '获取验证码',
                is_send: false,
            }
        },
        methods: {
            //注册页面返回登录页面
            go_login() {
                this.$router.push('/login');
            },
            // 校验用户是否注册
            check_username() {
                // 前台校验手机格式
                if (!this.username) return;
                // 访问后台对应用户是否存在
                this.$axios
                .post('/username', {
                    username: this.username
                })
                .then(response => {
                    if (response.data.status === 1) {
                        this.$message({
                            message: response.data.msg,
                            type: 'warning',
                            duration: 1000,
                        })
                    } 
                });
            },
            // 校验手机号码是否注册
            check_mobile() {
                // 前台校验手机格式
                if (!this.mobile) return;
                if (!this.mobile.match(/^1[3-9][0-9]{9}$/)) {
                    this.$message({
                        message: '手机号有误',
                        type: 'warning',
                        duration: 1000,
                        onClose: () => {
                            this.mobile = '';
                        }
                    });
                    return false;
                }
                // 访问后台校验手机号对应用户是否存在
                this.$axios
                .post('/mobile', {
                    mobile: this.mobile
                })
                .then(response => {
                    if (response.data.status === 1) {
                        this.$message({
                            message: response.data.msg,
                            type: 'warning',
                            duration: 1000,
                        })
                    } else {
                        // 未注册过的手机才允许发送验证码
                        this.is_send = true;
                    }
                });
            },
            send_sms() {
                if (!this.is_send) return;
                this.is_send = false;
                this.sms_interval = "发送中...";

                // 倒计时
                let sms_interval_time = 60;
                let timer = setInterval(() => {
                    if (sms_interval_time <= 1) {
                        clearInterval(timer);
                        this.sms_interval = "获取验证码";
                        this.is_send = true; // 重新回复点击发送功能的条件
                    } else {
                        sms_interval_time -= 1;
                        this.sms_interval = `${sms_interval_time}秒后再发`;
                    }
                }, 1000);

                this.$axios({
                    url: this.$settings.base_url + '/user/sms/',
                    method: 'post',
                    data: {
                        mobile: this.mobile
                    }
                }).then(response => {
                    if (response.data.status === 0) {
                        // 成功
                        this.$message({
                            message: '验证码发送成功',
                            type: 'success',
                        })
                    } else {
                        // 失败
                        this.$message({
                            message: '验证码发送失败',
                            type: 'error',
                        })
                    }
                }).catch(() => {
                    // 异常
                    this.$message({
                        message: '获取验证码异常',
                        type: 'error',
                    })
                });
            },
            register() {
                if (!this.username) {
                    this.$alert('用户名不能为空', '注册失败', {
                    confirmButtonText: '确定'
                    });
                    }else if (!this.mobile) {
                    this.$alert('手机号不能为空', '注册失败', {
                    confirmButtonText: '确定'
                    });
                    }else if(!this.password){
                        this.$alert('密码不能为空', '注册失败', {
                        confirmButtonText: '确定'
                    });
                    }
                this.$axios
                  .post('/register',{
                      mobile: this.mobile,
                      username: this.username,
                      password: this.password
                  })
                  .then(response => {
                    // 弹出框提示后，关闭注册界面，前台登录页面
                    this.$message({
                        message: '注册成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.$router.push('/login');
                        }
                    });
                }).catch(() => {
                    // 异常
                    this.$message({
                        message: '注册失败',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.mobile = '';
                            this.password = '';
                            this.sms = '';
                        }
                    })
                });
            }
        }
    }
</script>
<style scoped>
    .register {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .box {
        width: 400px;
        height: 600px;
        background-color: white;
        border-radius: 10px;
        position: relative;
        box-shadow: 0 0 25px #cac6c6;
        margin-left: 250px;
        margin-top: 80px;
        margin-bottom: 80px;
    }

    

    .content {
        position: absolute;
        top: 40px;
        width: 280px;
        left: 60px;
    }


    .nav > span {
        margin-left: 90px;
        color: darkgrey;
        user-select: none;
        cursor: pointer;
        padding-bottom: 10px;
    }

    .nav > span.active {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .el-input, .el-button {
        margin-top: 40px;
    }

    .el-button {
        width: 100%;
        font-size: 18px;
    }
    .foot > span {
        float: right;
        margin-top: 20px;
        color: orange;
        cursor: pointer;
    }
    .register {
    background:url("../assets/login.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
    .sms {
            color: orange;
            cursor: pointer;
            display: inline-block;
            width: 70px;
            text-align: center;
            user-select: none;
        }
</style>