<template>
  <div class="login">
      <van-nav-bar class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="onLogin" ref="login-from" :show-error="false" :show-error-message="false" @failed="onFailed" validate-first>
      <van-field center v-model="user.mobile" icon-prefix="toutiao" left-icon="shouji" name="mobile" placeholder="请输入手机号" :rules="loginRule.mobile"  />
      <van-field
        v-model="user.code"
        center
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入短信验证码" name="code" :rules="loginRule.code"
      >
        <template #button>
          <van-count-down :time="time" format="ss s" v-if="isShowTime" @finish="isShowTime = false"/>
          <van-button :loading="sendLoading" size="mini" class="send-btn" v-else round @click.prevent="sendYzm">发送验证码</van-button>
        </template>
      </van-field>
        <div class="button_wrap">
          <van-button type="info" block>登录</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import { onLogin, sendYzm } from '@/api/login'
import { Toast } from 'vant'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isShowTime: false,
      sendLoading: false,
      time: 1000 * 60,
      loginRule: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
      message: '登录中...',
      forbidClick: true,
      duration: 0
    })
      try {
         const res = await onLogin(this.user)
          console.log(res)
          this.$store.commit('setUser', res.data.data)
          Toast.success('登录成功')
          this.$store.commit('removeCachePages', 'layoutIndex')
          this.$router.push(this.$route.query.redirect || '/')
      } catch (error) {
        console.log(error)
        Toast.fail('手机号或密码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          position: 'top',
          message: error.errors[0].message
        })
      }
    },
    async sendYzm () {
      try {
        this.sendLoading = true
        await this.$refs['login-from'].validate('mobile')
        const res = await sendYzm(this.user.mobile)
        this.isShowTime = true
        if (this.time === 0) {
          this.isShowTime = false
        }
        console.log(res)
      } catch (err) {
         let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.sendLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  .button_wrap{
    margin: 26px 16px;
    .van-button{
      background: #66b1ff;
      border: none;
    }
  }
  .send-btn{
    width: 76px;
    height: 23px;
    background-color: #ededed;
  }
}
</style>
