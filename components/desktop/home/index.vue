<template>
  <div class="home">
    <div class="home__container">
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

export default {
  components: {
    SGreeting,
    SMediaPlayer
  },
  async fetch() {
    await this.$store.dispatch('player/getRecentlyPlayedAction')
  },
  computed: {
    recentlyPlayedList () {
      return this.$store.state.player.recentlyPlayedList
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding: 1.5rem;
  &__container {
    display: grid;
    grid-gap: 1.5rem;
  }
}
</style>
