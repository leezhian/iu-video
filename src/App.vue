<template>
  <iu-video :dataSource="dataSource" />
</template>

<script>
import { reactive } from 'vue'
import IuVideo from './plugins/iuvideo.vue'

export default {
  name: 'App',
  components: {
    IuVideo,
  },
  setup() {
    const dataSource = reactive([
      {
        type: 'video/mp4',
        url: 'https://huohucloud.9ishouyou.com/video/sp1.mp4'
      }
    ])

    return {
      dataSource,
    }
  },
}
</script>

<style>
</style>
