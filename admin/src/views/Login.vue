<template>
  <div class="login flex flex-align-center flex-pack-center">
    <div class="login-warp">
      <div class="top">
        <div class="logo"><i class="iconfont icon-frontend-sniper"></i></div>
        <div class="text">
          <div class="drsc">前端错误监控系统</div>
          <div class="name">Frontend Sniper</div>
        </div>
      </div>
      <div class="form">
        <a-card size="small" :title="type === 1 ? '登录' : '注册'" style="width: 300px">
          <a href="#" slot="extra" @click="changeType">{{type === 2 ? '登录' : '注册'}}</a>
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item label="用户名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                placeholder="Username"
                v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
              />
            </a-form-item>
            <a-form-item label="邮箱" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" v-if="type === 2">
              <a-input
                placeholder="email"
                v-decorator="['email', { rules: [{ required: true, message: 'Please input your username!' }, { type: 'email', message: 'The input is not valid E-mail!'},] }]"
              />
            </a-form-item>
            <a-form-item label="密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: 'Please input your Password!' }] },
                ]"
                type="password"
                placeholder="Password"
              >
              </a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
              <a-button type="primary" html-type="submit">
                Submit
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Register, Login } from '@/graphql/auth';

export default {
  name: 'login',
  data() {
    return {
      type: 1, // 1 登陆 2 注册
      form: this.$form.createForm(this,{ name: 'loginForm' })
    }
  },
  components: {
    
  },
  methods:{
    changeType(){
      this.form.resetFields()
      if(this.type === 1){
        this.type = 2
      } else {
        this.type = 1
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 登陆
          if(this.type === 1){
            this.$apollo.mutate({
              mutation: Login,
              variables: values,
              update:(cache, { data: { login}}) => {
                this.$store.commit('SET_TOKEN',{ token: login.token})
                this.$router.push('/')
              }
            })
          } else {
            // 注册
            this.$apollo.mutate({
              mutation: Register,
              variables: values,
              update:(cache, { data: { register}}) => {
                this.$store.commit('SET_TOKEN',{ token: register.token})
                this.$router.push('/')
              }
            })
          }
        }
      });
    },
  }
}
</script>

<style scope lang="scss">
.login{
  height: 100%;
  .login-warp{
    .top{
      text-align: center;
      .logo{
        i{
          font-size: 0.6rem;
        }
      }
      .text{
        .name{
          font-size: 0.24rem;
        }
        .drsc{
          font-size: 0.14rem;
          color: #999;
        }
      }
    }
    .form{
      margin-top: 0.3rem;
    }
  }
}
</style>
