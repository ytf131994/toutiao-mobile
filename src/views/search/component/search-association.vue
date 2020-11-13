<template>
  <div>
      <van-cell-group>
        <van-cell v-for="(item,index) in options" :key="index" icon="search">
          <div slot="title" v-html="heiLight(item)" @click="$emit('search', item)"></div>
        </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getAssoiation } from '@/api/search'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      options: [],
      time: null
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    heiLight (str) {
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style="color:red;">${this.searchText}</span>`)
    }
  },
  watch: {
     searchText: {
      handler: debounce(async function () {
        const res = await getAssoiation(this.searchText)
        this.options = res.data.data.options
        console.log(res)
      }, 200),
      immediate: true
    }
  }

}
</script>

<style>

</style>
