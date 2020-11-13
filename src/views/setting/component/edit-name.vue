<template>
  <div>
      <van-nav-bar
        title="昵称"
        left-text="取消"
        right-text="完成"
        left-arrow
        @click-left="$emit('close')"
        @click-right="onClickRight"
        />
        <div class="name-wrap">
            <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
            />
        </div>
  </div>
</template>
<script>
import { editUser } from '@/api/user'
import { Toast } from 'vant'
export default {
    data () {
        return {
            message: this.value
        }
    },
    methods: {
        async onClickRight () {
            Toast.loading({
                message: '保存中...',
                forbidClick: true
            })
            try {
                 const res = await editUser({
                name: this.message
                })
                this.message = res.data.data.name
                Toast.success('保存成功')
                this.$emit('close')
                this.$emit('input', this.message)
            } catch (error) {
                if (error && error.response && error.response.status === 409) {
                    Toast.fail('昵称已存在')
                }
            }
        }
    },
    props: {
        value: {
            type: String,
            required: true
        }
    }

}
</script>

<style lang="less" scoped>
.name-wrap{
    padding: 10px;
}
.van-field{
    background-color: #f5f7f9;
}
</style>
