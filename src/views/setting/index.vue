<template>
  <div>
      <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()"/>
      <input ref="file" type="file" accept="image/*" hidden @change="onFileChange">
      <van-cell @click="$refs.file.click()"  center title="头像" is-link>
          <van-image slot="default" round fit="cover" width="33" height="33" :src="user.photo" />
      </van-cell>
      <van-cell center title="昵称"  @click="isNameShow = true" is-link >
          <div>{{user.name}}</div>
      </van-cell>
       <van-cell center title="性别" @click="isGendershow = true" is-link >
          <div>{{user.gender === 1 ? '女' : '男'}}</div>
      </van-cell>
       <van-cell center title="生日" @click="isBrithdayshow = true" is-link >
          <div>{{user.birthday}}</div>
      </van-cell>
      <van-popup v-if="isNameShow" v-model="isNameShow" position="bottom" :style="{ height: '100%' }" >
          <edit-user v-model="user.name" @close="isNameShow = false"></edit-user>
      </van-popup>
      <van-popup v-model="isGendershow" position="bottom" >
          <edit-gender @close="isGendershow = false"  v-model="user.gender"></edit-gender>
      </van-popup>
      <van-popup v-model="isBrithdayshow" position="bottom" >
          <edit-brithday v-if="isBrithdayshow" @close="isBrithdayshow = false" v-model="user.birthday"></edit-brithday>
      </van-popup>
       <van-popup v-model="isPhotoshow"  position="bottom" :style="{ height: '100%' }">
           <edit-photo :file="imgPath" @close="isPhotoshow = false" @update-photo="updatePhoto"></edit-photo>
      </van-popup>
  </div>
</template>

<script>
import { getUser } from '@/api/user'
import editUser from './component/edit-name'
import editGender from './component/edit-gender'
import editBrithday from './component/edit-brithday'
import editPhoto from './component/edit-photo'
export default {
    data () {
        return {
            user: {},
            isNameShow: false,
            isGendershow: false,
            isBrithdayshow: false,
            isPhotoshow: false,
            imgPath: ''
        }
    },
    components: {
        editUser,
        editGender,
        editBrithday,
        editPhoto
    },
    methods: {
        async getUserList () {
            const res = await getUser()
            console.log(res)
            this.user = res.data.data
        },
        onFileChange () {
            this.isPhotoshow = true
            const blog = this.$refs.file.files[0]
            this.imgPath = blog
            this.$refs.file.value = ''
        },
        updatePhoto (file) {
            this.user.photo = window.URL.createObjectURL(file)
        }
    },
    created () {
        this.getUserList()
    }

}
</script>

<style lang="less" scoped>
.van-nav-bar{
    background-color: #2892ff;
    /deep/ .van-nav-bar__title{
        color: #fff;
    }
    /deep/ .van-icon{
        color: #fff;
    }
}
</style>
