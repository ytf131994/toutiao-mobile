<template>
  <div class="photo-wrap">
      <img class="img" ref="img" :src="imgPath" alt="">
        <van-nav-bar
        left-text="取消"
        right-text="完成"
        :border="false"
        @click-left="$emit('close')"
        @click-right="onClickRight"
        />
  </div>
</template>

<script>
import { editPhoto } from '@/api/user'
import { Toast } from 'vant'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
    data () {
        return {
            imgPath: window.URL.createObjectURL(this.file),
            cropper: null
        }
    },
    props: {
        file: {
            type: [File],
            required: true
        }
    },
    mounted () {
        const img = this.$refs.img
        this.cropper = new Cropper(img, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: false,
        background: false,
        movable: true
        })
    },
    methods: {
        getCroppedCanvas () {
            return new Promise(resolve => {
                this.cropper.getCroppedCanvas().toBlob((blob) => {
                    resolve(blob)
                })
            })
        },
        async onClickRight () {
             Toast.loading({
                message: '保存中...',
                forbidClick: true
            })
            const file = await this.getCroppedCanvas()
            const fd = new FormData()
            fd.append('photo', file)
            await editPhoto(fd)
            Toast.success('保存成功')
            this.$emit('close')
            this.$emit('update-photo', file)
        }
    }

}
</script>

<style lang="less">
.photo-wrap{
    height: 100%;
    width: 100%;
    background-color: #000;
    position: relative;
    /deep/ .van-nav-bar {
        background-color: #000;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .img{
        position: absolute;
        max-width: 100%;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>
