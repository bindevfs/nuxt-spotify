<template>
  <div class="home">
    <s-loading-dots v-if="$fetchState.pending"/>
    <div v-else class="home__container">
      <s-greeting />
      <s-media-player
        header="Recently played"
        :play-list="recentlyPlayedList"
      />
    </div>
  </div>
</template>
<script>
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
    await this.$store.dispatch('player/getRecentlyPlayedAction')
  },
  computed: {
    recentlyPlayedList () {
      return this.$store.state.player.recentlyPlayedList
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
