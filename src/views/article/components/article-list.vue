<template>
  <div>
      <van-cell title="全部评论"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有评论"
        @load="onLoad"
        >
        <article-item v-for="(comment,index) in list" :key="index" :comment="comment" @reply="$emit('onreply', $event)"></article-item>
        </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import articleItem from './article-item'
export default {
    data () {
        return {
            loading: false,
            finished: false,
            offset: null,
            limit: 10
        }
    },
    components: {
        articleItem
    },
    props: {
        articleId: {
            type: [String, Object, Number],
            required: true
        },
        list: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: 'a'
        }
    },
    methods: {
        async onLoad () {
            const { data } = await getComments({
                type: this.type,
                source: this.articleId.toString(),
                offset: this.offset,
                limit: this.limit
            })
           this.$emit('count', data.data.total_count)
            const { results } = data.data
            this.list.push(...results)
             console.log(this.list)
             this.loading = false
             if (results.length) {
                this.offset = data.data.last_id
            } else {
                this.finished = true
            }
    }
    }

}
</script>

<style lang="less" scoped>

</style>
