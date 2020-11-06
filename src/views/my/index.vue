<template>
  <div class="my_wrap">
    <van-cell-group class="my_info" v-if="user">
      <van-cell title="单元格" value="内容" center class="base_info" :border="false">
          <van-image round fit="cover" class="avter" slot="icon" width="66px" height="66px" :src="userList.photo" />
          <div slot="title" class="name">{{userList.name}}</div>
          <van-button round class="update_btn" size="small">编辑资料</van-button>
      </van-cell>
         <van-grid :border="false" class="data-info">
      <van-grid-item><div slot="text" class="data-info-item"><div class="text_count"><div class="span">{{userList.art_count}}</div><div class="text">头条</div></div></div></van-grid-item>
      <van-grid-item><div slot="text" class="data-info-item"><div class="text_count"><div class="span">{{userList.follow_count}}</div><div class="text">关注</div></div></div></van-grid-item>
      <van-grid-item><div slot="text" class="data-info-item"><div class="text_count"><div class="span">{{userList.fans_count}}</div><div class="text">粉丝</div></div></div></van-grid-item>
      <van-grid-item><div slot="text" class="data-info-item"><div class="text_count"><div class="span">{{userList.like_count}}</div><div class="text">获赞</div></div></div></van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="no-login" v-else>
      <img class="phone" @click="$router.push('/login')" src="./手机.png" width="66px" height="66px" alt="">
      <div class="login">登录/注册</div>
    </div>
      <van-grid column-num=2 class="nav-grid md-4">
        <van-grid-item icon="star-o" text="收藏" class="nav-grid-item"  />
        <van-grid-item icon="browsing-history-o" class="nav-grid-item" text="历史" />
      </van-grid>
      <van-cell title="消息通知" is-link to="" />
      <van-cell class="md-4" title="小智同学" is-link to="" />
      <van-cell class="signOut" v-if="user" title="退出登录" @click="signOut"  />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeItem } from '@/utils/storage'
import { Dialog } from 'vant'
import { getUser } from '@/api/login'
export default {
  data () {
    return {
      userList: {}
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    signOut () {
      Dialog.confirm({
      title: '退出确认',
      message: '退出当前头条账号，将不能同步收藏，发布评论和云端分享'
    })
      .then(() => {
        removeItem('toutiao-user')
        this.$router.go(0)
      })
      .catch(() => {
        // on cancel
      })
    },
    async getUser () {
      const res = await getUser()
      this.userList = res.data.data
      console.log(res)
    }
  },
  computed: {
    ...mapState(['user'])
  }

}
</script>

<style lang="less">
body{
  background-color: #f5f7f9;
}
.my_wrap{
  .my_info{
    background:url('./banner.png');
    .base_info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding: 38px 10px 10px 11px;
      .avter{
        border: solid 1px #fff;
        box-sizing: border-box;
      }
      .name{
        color: #fff;
        margin-left: 6px;
        font-size: 15px;
      }
      .update_btn{
        height: 16px;
        font-size: 10px;
        color: #666;
        border: none;
      }
    }
    .data-info {
      height: 65px;
      .data-info-item {
        color: #fff;
        .text_count{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
           .span{
          font-size: 18px;
        }
        .text{
          font-size: 11px;
        }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .no-login{
    background: url('./banner.png');
    height: 180px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .phone{
    }
    .login{
      margin-top: 4px;
      font-size: 14px;
      color: #fff;
    }
  }
  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .van-icon-star-o::before {
        color: red;
        font-size: 22px;
      }
      .van-icon-browsing-history-o::before{
        font-size: 22px;
        color: #ff9d1d;
      }
    }
  }
}
.signOut {
  text-align: center;
  color: #d86262;
}
.md-4 {
  margin-bottom: 4px;
}

</style>
