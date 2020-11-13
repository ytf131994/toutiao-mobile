<template>
  <div class="post-comment">
      <van-field class="post-info"
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        />
        <van-button class="btn" :disabled="message ? false : true" size="small" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
import { Toast } from 'vant'
export default {
    data () {
        return {
            message: ''
        }
    },
    props: {
        target: {
            type: [Object, String, Number],
            required: true
        },
        articleId: {
            type: [Object, String, Number],
            defaule: null
        }
    },
    methods: {
        async onPost () {
            Toast.loading({
            message: '发布中...',
            forbidClick: true
            })
            const res = await postComment({
                target: this.target.toString(),
                content: this.message,
                art_id: this.articleId ? this.articleId.toString() : null
            })
            Toast.success('发布成功')
            this.$emit('post-success', res.data.data.new_obj)
            this.message = ''
        }
    }

}
</script>

<style lang="less" scoped>
.post-comment {
    display: flex;
    padding: 14px;
    align-items: center;
    .post-info{
    }
    .btn{
    }
}
</style>
