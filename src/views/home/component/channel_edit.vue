<template>
  <div class="channel-edit">
    <van-cell-group>
        <van-cell center :border="false" class="van-wrap">
            <span class="title" slot="title">我的频道</span>
            <span class="btn" slot="default"><van-button type="warning" size="mini" round plain @click="isedit = !isedit">{{isedit ? '完成' : '编辑'}}</van-button></span>
        </van-cell>
    </van-cell-group>
    <van-grid :gutter="10">
        <van-grid-item class="grid-item" :class="{active: index === active}" v-for="(value,index) in channelsList" @click="onUserChannel(value, index)" :key="value.id" :text="value.name" >
            <van-icon slot="icon" :name="isedit && index!==0 ? 'clear' : ''" />
        </van-grid-item>
    </van-grid>
     <van-cell-group>
        <van-cell center :border="false" class="van-wrap">
            <span class="title" slot="title">推荐频道</span>
        </van-cell>
    </van-cell-group>
    <van-grid :gutter="10">
        <van-grid-item class="grid-item" v-for="value in recommendChannels" :key="value.id" :text="value.name" @click="addChannels(value)" />
    </van-grid>
  </div>
</template>

<script>
import { getChannels, addChannels, deleteUserChannel } from '@/api/article'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
    data () {
        return {
            allChannels: [],
            isedit: false
        }
    },
    props: {
        channelsList: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    methods: {
        async getAllChannels () {
            const res = await getChannels()
            this.allChannels = res.data.data.channels
            console.log(res)
        },
        async addChannels (value) {
            this.channelsList.push(value)
            if (this.user) {
               await addChannels({
                    channels: [
                        {
                            id: value.id,
                            seq: this.channelsList.length
                        }
                    ]
                })
            } else {
                setItem('userChannel', this.channelsList)
            }
        },
        onUserChannel (value, index) {
            if (this.isedit && index !== 0) {
                this.deleteChannel(value, index)
            } else {
                this.switchChannel(index)
            }
        },
        async deleteChannel (value, index) {
            if (index <= this.active) {
                this.$emit('update-active', this.active - 1)
            }
            this.channelsList.splice(index, 1)
            if (this.user) {
                const res = await deleteUserChannel(value.id)
                console.log(res)
            } else {
                setItem('userChannel', this.channelsList)
            }
        },
        switchChannel (index) {
            this.$emit('close')
            this.$emit('update-active', index)
        }
    },
    created () {
        this.getAllChannels()
    },
    computed: {
        ...mapState(['user']),
        recommendChannels () {
            return this.allChannels.filter(channels => {
                return !this.channelsList.find(userChannels => {
                    return userChannels.id === channels.id
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.channel-edit{
    padding-top: 54px;
    .van-wrap{
        .title{
            font-size: 15px;
            color: #333;
        }
        .btn{
            .van-button{
                font-size: 11px;
                width: 56px;
                height: 20px;
            }
        }
    }
    .grid-item{
        width: 80px;
        height: 43px;
        /deep/ .van-grid-item__content{
            background-color: #f4f5f6;
            position: relative;
            .van-grid-item__text{
                color: #222;
                font-size: 13px;
            }
            .van-grid-item__icon-wrapper{
                position: absolute;
                top: -6px;
                right: -6px;
                font-size: 20px;
                color: #ccc;
            }
        }
    }
    .active {
        /deep/ .van-grid-item__text{
            color: red !important;
        }
    }
}
</style>
