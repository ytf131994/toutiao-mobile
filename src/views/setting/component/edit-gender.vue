<template>
  <div>
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="defaultIndex"
        @cancel="$emit('close')"
        @confirm="onConfirm"
         @change="onChange"
    />
  </div>
</template>

<script>
import { editUser } from '@/api/user'
import { Toast } from 'vant'
export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            columns: ['男', '女'],
            defaultIndex: this.value
        }
    },
    methods: {
        onChange (picker, value, index) {
            this.defaultIndex = index
        },
         async onConfirm (index) {
               Toast.loading({
                message: '保存中...',
                forbidClick: true
            })
            await editUser({
                gender: this.defaultIndex
            })
                Toast.success('保存成功')
                this.$emit('close')
                this.$emit('input', this.defaultIndex)
        }
    }
}
</script>

<style>

</style>
