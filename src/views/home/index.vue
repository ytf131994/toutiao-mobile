<template>
  <div class="home-wrap">
    <van-nav-bar class="app-nav-bar">
     <van-button slot="title" class="search-btn" icon="search" type="info" round size="small" to="search">搜索</van-button>
  </van-nav-bar>
  <van-tabs class="tab_wrap" v-model="active">
    <van-tab  v-for="(item,index) in channelsList" :key="index" :title="item.name"><article-list :channel="item"></article-list></van-tab>
    <div slot="nav-right" style="width:33px;flex-shrink: 0;"></div>
    <div slot="nav-right" class="wap_wrap">
      <van-icon  name="wap-nav" @click="isShow=true"/>
    </div>
  </van-tabs>
  <van-popup closeable
  close-icon-position="top-left" get-container="body" v-model="isShow" position="top" class="popup_wrap" :style="{ height: '100%' }" >
  <channel-edit :channelsList=channelsList :active=active @close="isShow = false" @update-active="onUpdateActive"></channel-edit>
  </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/login'
import articleList from './component/article-list'
import channelEdit from './component/channel_edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data () {
    return {
      active: 0,
      channelsList: [],
      isShow: false
    }
  },
  components: {
    articleList,
    channelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getChannels () {
       if (this.user) {
         const res = await getChannels()
         this.channelsList = res.data.data.channels
       } else {
        const res = getItem('userChannel')
        if (res) {
          this.channelsList = res
        } else {
          const res = await getChannels()
         this.channelsList = res.data.data.channels
        }
       }
    },
    onUpdateActive (index) {
      this.active = index
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__title{
  max-width: none;
.search-btn{
  width: 277px;
  height: 32px;
  background-color: #5babfb;
}
}
.tab_wrap{
 /deep/ .van-tab{
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line{
    width: 15px !important;
    height: 3px;
    background-color: #3296fa;
    margin-bottom: 4px;
  }
  .wap_wrap{
    position: fixed;
    right: 0;
    line-height: 46px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33px;
    background-color: #fff;
    opacity: .8;
  }
}
</style>
