<template>
  <div>
      <van-cell class="article-item">
          <van-image class="avter" slot="icon" round fit="cover" :src="comment.aut_photo" />
          <div slot="title" class="name">{{comment.aut_name}}</div>
          <div slot="title" class="title">{{comment.content}}</div>
          <van-icon class="icon" @click="onLike" slot="right-icon" :color="comment.is_liking ? 'orange' : '#777'" :name="comment.is_liking ? 'good-job' : 'good-job-o'" /><span slot="right-icon" class="num">{{comment.like_count}}</span>
          <span slot="label" class="time">{{comment.pubdate | dateTime('MM-DD HH:mm')}} ·</span><van-button slot="label" type="default" size="mini" class="btn" round @click="$emit('reply', comment)">{{comment.reply_count}}回复</van-button>
      </van-cell>
  </div>
</template>

<script>
import { addLike, deleteLike } from '@/api/comment'
export default {
    data () {
        return {

        }
    },
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    methods: {
        async onLike () {
            const commentId = this.comment.com_id.toString()
            console.log(this.comment)
            if (this.comment.is_liking) {
               await deleteLike(commentId)
               this.comment.like_count--
            } else {
                await addLike(commentId)
                this.comment.like_count++
            }
            this.comment.is_liking = !this.comment.is_liking
        }
    }
}
</script>

<style lang="less" scoped>
.article-item{
    .avter{
        width: 44px;
        height: 44px;
        margin-right: 10px;
    }
    .name{
        color: #3f6798;
        font-size: 10px;
    }
    .title{
        font-size: 16px;
        color: #2f2f2f;
    }
    .icon{
        font-size: 18px;
    }
    .num{
        margin-top: -2px;
        font-size: 12px;
    }
    .time{
        color: #525252;
        font-size: 12px;
    }
    .btn{
        margin-left: 10px;
    }
}
</style>
