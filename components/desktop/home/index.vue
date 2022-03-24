<template>
  <div class="home">
    <s-loading-dots v-if="$fetchState.pending"/>
    <div v-else class="home__container">
      <s-greeting v-if="false"/>
      <s-media-player
        v-if="recentlyPlayedList.length !== 0"
        header="Recently played"
        :play-list="recentlyPlayedList"
        :is-view-all="false"
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
import SGreeting from '~/components/desktop/home/greeting'
import SMediaPlayer from '~/components/shared/molecules/player-media'
import SLoadingDots from '~/components/shared/ui/loading-dots/index.vue'

export default {
  components: {
    SGreeting,
    SMediaPlayer,
    SLoadingDots
  },
  async fetch() {
    try {
      await Promise.all([
        this.$store.dispatch('player/getRecentlyPlayedAction'),
        this.$store.dispatch('browse/getFeaturedPlayLists')
      ])
    } catch (e) {
      console.error(e)
      return false
    }
  },
  computed: {
    ...mapGetters('browse', {
      featuredPlayLists: 'getFeaturedPlayLists',
      titleFeaturedPlayLists: 'getTitleFeaturedPlayLists'
    }),
    recentlyPlayedList () {
      return this.$store.getters['player/getRecentlyPlayedList']
    }
  },
  activated() {
    // Call fetch again if last fetch more than a minute ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
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
