<template>
  <div>
      <van-nav-bar
        :title="`${comment.reply_count}条回复`">
        <van-icon name="cross" @click="$emit('close')" slot="left"/>
      </van-nav-bar>
      <article-item :comment=comment></article-item>
      <article-list class="list" :list="commentList" :articleId="comment.com_id" type="c"></article-list>
        <div class="article-bottom">
            <van-button class="btn" round type="default" @click="isShow=true">写评论</van-button>
        </div>
        <van-popup v-model="isShow" position="bottom" >
            <post-comment :target="comment.com_id" :article-id="articleId" @post-success="onPostSuccess"></post-comment>
        </van-popup>
  </div>
</template>

<script>
import articleItem from './article-item'
import articleList from './article-list'
import postComment from './post-comment'
export default {
    data () {
        return {
            isShow: false,
            commentList: []
        }
    },
    props: {
        comment: {
            type: Object,
            required: true
        },
        articleId: {
            type: [Object, Number, String],
            required: true
        }
    },
    components: {
        articleItem,
        articleList,
        postComment
    },
    methods: {
        onPostSuccess (comment) {
            this.isShow = false
            this.commentList.unshift(comment)
            this.comment.reply_count++
        }
    }

}
</script>

<style lang="less" scoped>
.list{
    padding-bottom: 50px;
}
.article-bottom{
      border: 1px solid #f6f6f6;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      .btn{
          width: 200px;
          height: 30px;
          line-height: 40px;
      }
}
</style>
