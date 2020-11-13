<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onFirm"
    />
  </div>
</template>

<script>
import { editUser } from '@/api/user'
import dayjs from 'dayjs'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
 data () {
   return {
      minDate: new Date(1931, 1, 1),
      maxDate: new Date(2021, 11, 11),
      currentDate: new Date(this.value)
   }
 },
 methods: {
      async onFirm (value) {
        Toast.loading({
          message: '保存中...',
          forbidClick: true
      })
       await editUser({
        brithday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
         Toast.success('保存成功')
        this.$emit('close')
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
      }
 }
}
</script>

<style>

</style>
