<template>
  <layout-common-detail-track :is-loading="$fetchState.pending">
    <template #media-summary>
      <media-summary :media-summary="mediaSummary"/>
    </template>
    <template #actions>
      <action-detail-track
        :is-playing="isArtistPlaying"
        @click-play="toggleAlbum"
      />
    </template>
    <template #tracks>
      <s-popular-list-song
        :songs="topTracks"
        @play-song="handleTogglePlaySongArtist"
      />
    </template>
    <template #more>
      <s-media-player
        header="Fans also like"
        :play-list="artistRelated"
        :is-view-all="false"
      />
    </template>
  </layout-common-detail-track>
</template>
<script>
export default {
  components: {
    SPopularListSong: () => import('~/components/desktop/artist/popular-list-song.vue'),
    SMediaPlayer: () => import('~/components/shared/molecules/player-media'),
    LayoutCommonDetailTrack: () => import('~/components/shared/molecules/layout-common-detail/index.vue'),
    ActionDetailTrack: () => import('~/components/shared/molecules/actions-detail/index.vue'),
    MediaSummary: () => import('~/components/shared/molecules/media-summary/index.vue')
  },
  async fetch() {
    try {
      const id = this.$route.params.id
      await Promise.all([
        this.$store.dispatch('artists/getArtistTopTrackAction', id),
        this.$store.dispatch('artists/getArtistAction', id),
        this.$store.dispatch('artists/getArtistRelatedAction', id)
      ])
    } catch (e) {
      return false
    }
  },
  fetchDelay: 500,
  computed: {
    mediaSummary () {
      return {
        imageUrl: this.artistImageUrl,
        name: this.artist.name,
        type: 'ARTIST',
        artists: [],
        description: this.artistFollowers + ' Followers'
      }
    },
    topTracks () {
      if (this.isArtistPlaying) {
        const playBack = this.$store.getters['playback/getPlayback']
        const uri = playBack.track_window?.current_track?.uri
        return this.$store.state.artists.topTracks.map((track) => {
          return {
            ...track,
            is_playing_current: uri === track.uri
          }
        })
      }
      return this.$store.state.artists.topTracks.map((track) => {
        return {
          ...track,
          is_playing_current: false
        }
      })
    },
    artist () {
      return this.$store.state.artists.artist
    },
    artistRelated () {
      return this.$store.getters['artists/getTopFiveArtistRelated']
    },
    artistImageUrl () {
      return this.artist?.images?.[0]?.url
    },
    artistFollowers () {
      return this.artist?.followers?.total || 0
    },
    isArtistPlaying () {
      return this.$store.getters['artists/isArtistPlaying']
    }
  },
  methods: {
    async toggleAlbum () {
      const payload = {
        isPlaying: this.isArtistPlaying,
        request: {
          context_uri: this.artist.uri,
          position_ms: this.position
        }
      }
      await this.$store.dispatch('playback/togglePlay', payload)
    },
    async handleTogglePlaySongArtist (song) {
      const payload = {
        isPlaying: false,
        request: {
          context_uri: song.album.uri,
          offset: {
            position: song.track_number - 1
          },
          position_ms: this.position
        }
      }
      await this.$store.dispatch('playback/togglePlay', payload)
    }
  }
}
</script>
