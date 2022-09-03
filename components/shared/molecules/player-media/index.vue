<template>
  <s-layout-container
    :header="header"
    :is-view-all="isViewAll"
    @clickTitle="handleClickTitle"
    @clickAll="handleClickViewAll"
  >
    <s-media
      v-for="(item, index) in playList"
      :key="`${index}`"
      :item="item"
      @click="handleClickMedia"
      @click-play="handleClickPlay"
    />
  </s-layout-container>
</template>
<script>
import SLayoutContainer from '~/components/shared/ui/layout-container/index.vue'
import SMedia from '~/components/shared/ui/media/index.vue'
export default {
  components: {
    SLayoutContainer,
    SMedia
  },
  props: {
    playList: {
      type: Array,
      default: () => []
    },
    header: {
      type: [String, Object],
      required: true
    },
    isViewAll: {
      type: Boolean,
      default: true
    },
    isUris: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickTitle () {
      //
    },
    handleClickViewAll () {
      //
    },
    handleClickMedia (item) {
      if (item.type === 'artist') {
        this.$router.push(`/artist/${item.id}`)
        return
      }
      if (item.type === 'track') {
        this.$router.push(`/album/${item.album.id}`)
      }
    },
    async handleClickPlay (item) {
      const payload = {
        isPlaying: item.isPlaying,
        request: this.isUris ? {'uris': [item.uri]}  : { context_uri: item.uri }
      }
      await this.$store.dispatch('playback/togglePlay', payload)
    }
  }
}
</script>
