<template>
  <div>
      <van-cell class="article-item" :to="{
          name: 'article',
          params: {
              articleId: article.art_id
          }
      }">
          <div class="title van-multi-ellipsis--l3" slot="title">{{article.title}}</div>
          <div slot="label">
              <div class="cover_wrap" v-if="article.cover.type === 3">
                  <div class="cover_item" v-for="(img,index) in article.cover.images" :key="index">
                      <van-image width="116" fit="cover" height="73" :src="img" />
                  </div>
              </div>
              <div class="labe_wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}</span>
                <span>{{article.pubdate | relativeTime}}</span>
              </div>
          </div>
          <van-image v-if="article.cover.type === 1" fit="cover" class="right_cover" :src="article.cover.images[0]" />
      </van-cell>
  </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.article-item{
    .title{
        font-size: 16px;
        color: #3a3a3a;
    }
    /deep/ .van-cell__value{
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }
    .cover_wrap{
         display: flex;
        .cover_item{
           flex: 1;
           padding-left: 3px;
        }
    }
    .right_cover{
        width: 116px;
        height: 73px;
    }
    .labe_wrap{
        color: #b4b4b4;
        span:nth-child(2){
            padding-left: 10px;
        }
        span:nth-child(3){
            padding-left: 10px;
        }
    }
}
</style>
