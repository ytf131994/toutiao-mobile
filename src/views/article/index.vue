<template>
  <div class="article_warp">
      <van-nav-bar
        left-arrow
        title="文章详情"
        @click-left="$router.back()"
        />
        <div class="article_content">
        <h1 class="title">{{article.title}}</h1>
        <van-cell center class="user_info" :border="false">
            <div class="name" slot="title">{{article.aut_name}}</div>
            <van-image slot="icon" class="img" round fit="cover"  :src="article.aut_photo" />
            <div slot="label" class="time">{{article.pubdate | relativeTime}}</div>
            <van-button slot="right-icon" :loading="flowerLoading" loading-type="spinner" @click="flower()" class="btn" :icon="article.is_followed ? '' : 'plus'" :type="article.is_followed ? 'default' : 'info'" round size="mini">{{article.is_followed ? '已关注' : '关注'}}</van-button>
        </van-cell>
        <div class="markdown-body" ref="article-content" v-html="article.content">
        </div>
        <article-list :articleId=articleId :list=commentList @count="onCount" @onreply="onReply"></article-list>
        </div>
        <div class="article-bottom">
            <van-button class="btn" round type="default" @click="isShow = true">写评论</van-button>
            <van-icon name="comment-o" :badge="count"  color="#777" class="icon-one"/>
            <van-icon @click="collect(article)" :name="article.is_collected ? 'star' : 'star-o' " :color="article.is_collected ? 'orange' : '#777'"/>
            <van-icon :name="article.attitude === 1 ? 'good-job' : 'good-job-o'" :color="article.attitude === 1 ? 'red' : '#777'" @click="onLike(article)"/>
            <van-icon name="share" color="#777"/>
        </div>
        <van-popup v-model="isShow" position="bottom">
            <post-comment :target=articleId @post-success="postSuccess"></post-comment>
        </van-popup>
        <van-popup v-if="isReplyShow" v-model="isReplyShow" position="bottom" :style="{ height: '50%' }">
            <article-reply :article-id="articleId" @close="isReplyShow = false" :comment=comment></article-reply>
        </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import '@/utils/dayjs'
import { getArticles, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { ImagePreview, Toast } from 'vant'
import { addFlower, deleteFlower } from '@/api/user'
import articleList from './components/article-list'
import postComment from './components/post-comment'
import articleReply from './components/article-reply'
export default {
    data () {
        return {
            article: {},
            flowerLoading: false,
            isShow: false,
            commentList: [],
            count: 0,
            comment: {},
            isReplyShow: false
        }
    },
    methods: {
        async getArticles () {
            const res = await getArticles(this.articleId)
            this.article = res.data.data
            console.log(res)
            this.$nextTick(() => {
               this.handlePerviewImage()
            })
        },
        handlePerviewImage () {
            const articleContent = this.$refs['article-content']
            const imgs = articleContent.querySelectorAll('img')
            const imgPaths = []
            imgs.forEach((img, index) => {
                imgPaths.push(img.src)
                img.onclick = function () {
                   ImagePreview({
                        images: imgPaths,
                        startPosition: index
                        })
                }
            })
        },
        async flower () {
            this.flowerLoading = true
            if (this.article.is_followed) {
                 await deleteFlower(this.article.aut_id)
                 Toast.fail('取消关注')
            } else {
                 const res = await addFlower(this.article.aut_id)
                 console.log(this.article.aut_id)
                 console.log(res)
                 Toast.success('关注成功')
            }
            this.article.is_followed = !this.article.is_followed
            this.flowerLoading = false
        },
         async collect (article) {
             Toast.loading({
            message: '操作中...',
            forbidClick: true
            })
            if (article.is_collected) {
                await deleteCollect(article.art_id)
                 Toast.fail('取消收藏')
            } else {
                await addCollect(article.art_id)
                 Toast.success('收藏成功')
            }
            this.article.is_collected = !this.article.is_collected
        },
         async onLike (article) {
             Toast.loading({
            message: '操作中...',
            forbidClick: true
            })
            if (article.attitude === 1) {
                await deleteLike(article.art_id)
                 Toast.fail('取消点赞')
                 this.article.attitude = -1
            } else {
                await addLike(article.art_id)
                 Toast.success('点赞成功')
                 this.article.attitude = 1
            }
        },
        postSuccess (comment) {
            this.commentList.unshift(comment)
            this.count++
            this.isShow = false
        },
        onCount (count) {
            this.count = count
        },
        onReply (comment) {
            this.comment = comment
            this.isReplyShow = true
        }
    },
    created () {
        this.getArticles()
    },
    props: {
        articleId: {
            type: [String, Number, Object],
            required: true
        }
    },
    components: {
        articleList,
        postComment,
        articleReply
    }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
    background-color: #2892ff;
    /deep/ .van-icon {
        color: #fff;
    }
}
.article_content{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 44px;
    top: 46px;
    overflow-y: auto;
}
.title{
    font-size: 20px;
    color: #3a3a3a;
    padding-left: 14px;
}
.user_info{
    .img{
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .name{
        font-size: 12px;
        color: #333;
        margin-bottom: -10px;
    }
    .time{
        color: #b4b4b4;
        font-size: 11px;

    }
    .btn{
        width: 85px;
        height: 29px;
    }
}
.markdown-body{
    padding-left: 14px;
    padding-bottom: 50px;
}
.article-bottom{
    border: 1px solid #f6f6f6;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    height: 44px;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
        flex: 3;
        width: 172px;
        height: 25px;
        margin: 0 18px;
    }
    .van-icon{
        flex: 1;
        font-size: 20px;
    }
    .icon-one{
        margin-top: 5px;
        .van-info {
            right: 22px;
        }
    }
}

</style>
