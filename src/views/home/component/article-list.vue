<template>
  <div class="articleList" ref="article-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <article-item v-for="item in articleList" :key="item.id" :article="item"></article-item>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import articleItem from '@/components/article-item'
import { Toast } from 'vant'
import { debounce } from 'lodash'
export default {
    data () {
        return {
            articleList: [],
            loading: false,
            finished: false,
            timestamp: null,
            isLoading: false,
            scrollTop: 0
        }
    },
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    mounted () {
        const articleList = this.$refs['article-list']
        articleList.onscroll = debounce(() => {
            this.scrollTop = articleList.scrollTop
        }, 50)
    },
    components: {
    articleItem
    },
    activated () {
        this.$refs['article-list'].scrollTop = this.scrollTop
    },
    methods: {
         async onLoad () {
             const res = await getArticle({
                 channel_id: this.channel.id,
                 timestamp: this.timestamp || Date.now(),
                 with_top: 1
             })
             const results = res.data.data.results
             console.log(results)
             if (results.length > 0) {
                  this.articleList.push(...results)
                  this.loading = false
                  this.timestamp = res.data.data.pre_timestamp
             } else {
                 Toast('没有数据')
                 this.finished = true
             }
            //  if (results) {
            //      this.timestamp = res.data.data.pre_timestamp
            //  } else {
            //      this.finished = true
            //  }
        },
         async onRefresh () {
            const res = await getArticle({
                    channel_id: this.channel.id,
                    timestamp: Date.now(),
                    with_top: 1
                })
                const results = res.data.data.results
                this.articleList.unshift(...results)
                Toast(`刷新成功,更新${results.length}条数据`)
                this.isLoading = false
    }
    }
}
</script>

<style lang="less" scoped>
.articleList{
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
}
</style>
