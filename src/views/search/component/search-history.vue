<template>
  <div>
       <van-cell  center value="历史记录" >
          <van-icon slot="right-icon" name="delete" v-if="isShow === false" @click="onChang" />
          <div slot="right-icon" @click="onChang" v-else>
              <span @click="allDelete">全部删除</span>
              &nbsp;&nbsp;
              <span>完成</span>
          </div>
       </van-cell>
       <van-cell-group>
            <van-cell v-for="(item,index) in historyList" :key="index"  center :value="item" @click="onDelete(index, item)">
                <van-icon slot="right-icon" v-if="isShow" name="close" />
            </van-cell>
        </van-cell-group>
  </div>
</template>

<script>
import { setItem, removeItem } from '@/utils/storage'
import { Dialog } from 'vant'
export default {
    data () {
        return {
            isShow: false
        }
    },
    props: {
        historyList: {
            type: Array,
            required: true
        }
    },
    methods: {
        onChang () {
            this.isShow = !this.isShow
        },
        allDelete () {
            this.isShow = false
            Dialog.confirm({
            title: '提醒',
            message: '是否全部删除'
            })
            .then(() => {
                removeItem('history')
                this.$router.go(0)
            })
            .catch(() => {
                // on cancel
            })
        },
        onDelete (index, item) {
            if (this.isShow) {
                this.historyList.splice(index, 1)
                setItem('history', this.historyList)
            } else {
                this.$emit('search', item)
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>
