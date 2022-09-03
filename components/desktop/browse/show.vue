<template>
  <div class="browse-show">
    <s-loading-dots v-if="$fetchState.pending"/>
    <template v-else>
      <s-media-player
        header="Popular playlists"
        :play-list="playlists"
      />
    </template>
  </div>
</template>
<script>
export default {
  components: {
    SMediaPlayer: () => import('~/components/shared/molecules/player-media'),
    SLoadingDots: () => import('~/components/shared/ui/loading-dots/index.vue')
  },
  async fetch() {
    await this.$store.dispatch('browse/getCategoryPlaylistsAction', this.$route.params.id)
  },
  computed: {
    playlists () {
      return this.$store.state.browse.playlists
    }
  }
}
</script>
<style lang="scss" scoped>
.browse-show {
  // padding: 60px 1.5rem 1.5rem;
}
</style>
