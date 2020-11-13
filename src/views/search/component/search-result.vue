<template>
  <div>
      <van-list class="search-result"
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<van-cell v-for="item in list" :key="item.id" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search'
export default {
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            queryInfo: {
                page: 1,
                per_page: 20,
                q: this.searchText
            }
        }
    },
     props: {
        searchText: {
            type: String,
            required: true
        }
    },
    methods: {
        async onLoad () {
             const res = await getResult(this.queryInfo)
             console.log(res)
             const results = res.data.data.results
             this.list.push(...results)
             this.loading = false
             if (results) {
                 this.queryInfo.page++
             } else {
                 this.finished = true
             }
        }
    }
}
</script>

<style lang="less" scoped>
.search-result{
    position: fixed;
    right: 0;
    top: 55px;
    overflow-y: auto;
    left: 0;
    bottom: 0;
}
</style>
