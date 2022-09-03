<template>
  <layout-common-detail-track :is-loading="$fetchState.pending">
    <template #media-summary>
      <media-summary :media-summary="summary" />
    </template>
    <template #actions>
      <action-detail-track
        :is-playing="isAlbumPlaying"
        @click-play="toggleAlbum"
      />
    </template>
    <template #tracks>
      <s-popular-list-song
        :songs="topTracks"
        type="album"
        @play-song="handleTogglePlaySongAlbum"
      />
    </template>
  </layout-common-detail-track>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    SPopularListSong: () => import('~/components/desktop/artist/popular-list-song.vue'),
    LayoutCommonDetailTrack: () => import('~/components/shared/molecules/layout-common-detail/index.vue'),
    ActionDetailTrack: () => import('~/components/shared/molecules/actions-detail/index.vue'),
    MediaSummary: () => import('~/components/shared/molecules/media-summary/index.vue')
  },
  async fetch() {
    try {
      await this.$store.dispatch('albums/getAlbum', this.$route.params.id)
    } catch (e) {
      return false
    }
  },
  fetchDelay: 500,
  computed: {
    ...mapGetters({
      tracks: 'albums/getTracks',
      summary: 'albums/getAlbumSummary',
      isAlbumPlaying: 'albums/isAlbumPlaying',
      playBack: 'playback/getPlayback',
      position: 'playback/position'
    }),
    album () {
      return this.$store.state.albums.album
    },
    topTracks () {
      if (this.isAlbumPlaying) {
        const playBack = this.playBack
        const uri = playBack.track_window?.current_track?.uri
        return this.tracks.map((track) => {
          return {
            ...track,
            is_playing_current: uri === track.uri
          }
        })
      }
      return this.tracks.map((track) => {
        return {
          ...track,
          is_playing_current: false
        }
      })
    },
  },
  methods: {
    async handleTogglePlaySongAlbum (song) {
      const payload = {
        isPlaying: false,
        request: {
          context_uri: this.album.uri,
          offset: {
            position: song.track_number - 1
          },
          position_ms: this.position
        }
      }
      await this.$store.dispatch('playback/togglePlay', payload)
    },
    async toggleAlbum () {
      if (this.topTracks.length) {
        const payload = {
          isPlaying: this.isAlbumPlaying,
          request: {
            context_uri: this.album.uri,
            offset: {
              position: 0
            },
            position_ms: this.position
          }
        }
        await this.$store.dispatch('playback/togglePlay', payload)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.album {
  &__head {
    min-height: 274px;
    max-height: 500px;
    height: 35vh;
    display: flex;
    align-items: flex-end;
    padding: 0 32px 24px;
  }

  &__container {
    position: relative;
  }

  &__songs {
    padding: 0 32px;
  }
}

.media-summary {
  &__contain {
    display: flex;
    align-items: flex-end;
  }

  &__items {
    margin-left: 2rem;
    flex: 1;
  }

  &__avatar {
    position: relative;
    width: calc(clamp(233px, 31vw, 250px));
    height: calc(clamp(233px, 31vw, 250px));
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__type {
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    text-transform: uppercase;

  }

  &__name {
    font-size: 48px;
    line-height: 48px;
    padding: 0.08em 0;
    font-weight: 900;
  }
}
</style>
