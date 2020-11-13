<template>
  <div>
      <form action="/">
  <van-search
    v-model="value"
    show-action
    background="#2892ff"
    placeholder="请输入搜索关键词"
    @search="onSearch(value)"
    @cancel="$router.back()"
    @focus="isResultShow=false"
  />
</form>
    <search-result :searchText=value v-if="isResultShow"></search-result>
    <search-association v-else-if="value" :searchText=value @search="onSearch"></search-association>
    <search-history :historyList=historyList v-else  @search="onSearch"></search-history>
  </div>
</template>

<script>
import searchAssociation from './component/search-association'
import searchHistory from './component/search-history'
import searchResult from './component/search-result'
import { setItem, getItem } from '@/utils/storage'
// import { getHistory } from '@/api/search'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            value: '',
            isResultShow: false,
            historyList: []
        }
    },
    components: {
        searchAssociation,
        searchHistory,
        searchResult
    },
    computed: {
      ...mapState(['user'])
    },
     created () {
       this.getHistory()
    },
    methods: {
    onSearch (value) {
      this.value = value
      const index = this.historyList.indexOf(value)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(value)
      setItem('history', this.historyList)
      console.log(this.historyList)
      this.isResultShow = true
    },
    async getHistory () {
      const localHistory = getItem('history') || []
      // if (this.user) {
      //    const res = await getHistory()
      //   localHistory = [...new Set([...localHistory, ...res.data.data.keywords])]
      // }
      this.historyList = localHistory
    }
  }

}
</script>

<style>

</style>
