<template>
  <div>
      <van-nav-bar class="app-nav-bar"
        title="小智同学"
        left-arrow
        @click-left="$router.back()"
        />
        <van-cell-group class="content-wrap">
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
        </van-cell-group>
        <van-cell-group class="send-wrap">
             <van-field v-model="message" placeholder="请输入消息" />
             <van-button class="btn" type="primary">发送</van-button>
        </van-cell-group>
  </div>
</template>

<script>
export default {
    data () {
        return {
            message: ''
        }
    }
}
</script>

<style lang="less" scoped>
.content-wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 50px;
    overflow-y: auto;
}
.send-wrap{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .btn{
        width: 100px;
    }
}
</style>
