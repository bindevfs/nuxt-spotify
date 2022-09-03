<template>
  <section>
    <div class="search">
      <div class="search__head">
        <div class="search__input">
          <a-input
            v-model="searchInput"
            placeholder="Enter Artists, songs, albums, or playlists"
            allow-clear
            @change="handleSearch"
          />
        </div>
      </div>
      <div class="search__body">
        <s-media-player
          v-if="artists.length !== 0"
          header="Artist"
          :play-list="artists"
          :is-view-all="false"
        />
        <s-media-player
          v-if="albums.length !== 0"
          header="Albums"
          :play-list="albums"
          :is-view-all="false"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { debounce } from 'lodash-es'

export default {
  components: {
    SMediaPlayer: () => import('~/components/shared/molecules/player-media'),
  },
  data () {
    return {
      searchInput: '',
      artists: [],
      albums: [],
      tracks: [],
      playlists: []
    }
  },
  methods: {
    handleSearch: debounce(function (e) {
      this.search()
    }, 300),
    async search () {
      try {
        const params = {
          q: this.searchInput,
          type: 'track,artist,album,playlist',
          limit: 10
        }
        const { tracks, artists, albums, playlists } = await this.$searchApi.search(params)
        this.artists = artists.items
        this.albums = albums.items
        this.tracks = tracks.items
        this.playlists = playlists.playlists
      } catch (e) {
        console.error('error search: ', e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  padding: $header-height 1.5rem 1.5rem;
  &__input {
    max-width: 300px;
  }
}
</style>
