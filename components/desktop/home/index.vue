<template>
  <div class="home">
    <s-loading-dots v-if="isLoading"/>
    <div v-else class="home__container">
      <s-greeting v-if="false"/>
      <s-media-player
        v-if="recentlyPlayedList.length !== 0"
        header="Recently played"
        :play-list="recentlyPlayedList"
        :is-view-all="false"
        is-uris
      />
      <s-media-player
        v-if="featuredPlayLists.length !== 0"
        :header="titleFeaturedPlayLists"
        :play-list="featuredPlayLists"
        :is-view-all="false"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    SGreeting: () => import('~/components/desktop/home/greeting'),
    SMediaPlayer: () => import('~/components/shared/molecules/player-media'),
    SLoadingDots: () => import('~/components/shared/ui/loading-dots/index.vue')
  },
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      featuredPlayLists: 'browse/getFeaturedPlayLists',
      titleFeaturedPlayLists: 'browse/getTitleFeaturedPlayLists',
      playback: 'playback/currentTrack'
    }),
    recentlyPlayedList () {
      return this.$store.getters['player/getRecentlyPlayedList']
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      await Promise.all([
        this.$store.dispatch('player/getRecentlyPlayedAction'),
        this.$store.dispatch('browse/getFeaturedPlayLists')
      ])
      this.isLoading = false
    } catch (e) {
      this.isLoading = false
      console.error(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding: $header-height 1.5rem 1.5rem;
  &__container {
    display: grid;
    grid-gap: 1.5rem;
  }
}
</style>
