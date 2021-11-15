<template>
  <div class="browse-show">
    <s-media-player
      header="Popular playlists"
      :play-list="playlists"
    />
  </div>
</template>
<script>
import SMediaPlayer from '~/components/shared/molecules/player-media'

export default {
  components: {
    SMediaPlayer
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
