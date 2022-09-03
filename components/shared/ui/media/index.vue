<template>
  <div class="media">
    <div class="media__container">
      <div class="media__click" @click="handleClickMedia"></div>
      <div class="media__cover">
        <s-media-thumbnail :bordered="isTypeArtist" :src-image="imagePath" :alt="name"/>
        <div class="media__play">
          <s-play-button :is-playing="isPlaying" @click="handleClickPlay"/>
        </div>
      </div>
      <div class="media__content">
        <a class="media__song-name" href="javascript:void(0)">
          <div class="media__song-name_text">
            {{ name }}
          </div>
        </a>
        <div v-if="isNotLink" class="media__desc" v-html="contents"></div>
        <div v-else class="media__desc">
          <template v-for="(artist, index) in artists">
            <a
              :key="`${index}_${artist.id}`"
              @click="$router.push(`/artist/${artist.id}`)">
              {{ artist.name }}
            </a>
            <span v-if="index < artists.length - 1" :key="artist.id" class="comma">
              &#44;
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SMediaThumbnail from '~/components/shared/ui/media/thumbnail'
import SPlayButton from '~/components/shared/ui/play-button'
import { isMediaPlayingState } from '~/utils/state-util'

export default {
  components: {
    SMediaThumbnail,
    SPlayButton
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    media () {
      return this.item
    },
    name () {
      return this.media?.name || ''
    },
    isTypePlayList () {
      return this.media?.type === 'playlist'
    },
    isTypeArtist () {
      return this.media?.type === 'artist'
    },
    isTypeAlbum () {
      return this.media?.type === 'album'
    },
    isNotLink () {
      return this.isTypePlayList || this.isTypeArtist
    },
    contents () {
      if (this.isTypePlayList) {
        return this.media.description
      }
      if (this.isTypeArtist) {
        return this.media?.type
      }
      return this.media?.artists
    },
    artists () {
      return this.media?.artists
    },
    imagePath () {
      if (this.isTypePlayList || this.isTypeArtist || this.isTypeAlbum) {
        return this.media?.images[0]?.url || require('/static/images/commons/artist-default.svg')
      }
      // eslint-disable-next-line import/no-absolute-path
      return this.media?.album?.images[0]?.url || require('/static/images/commons/artist-default.svg')
    },
    uri () {
      if (this.item.track) {
        return this.item.track?.uri || ''
      }
      return this.item?.uri
    },
    combinePlayBackUri () {
      const playBack = this.$store.getters['playback/getPlayback']
      if (Object.keys(playBack).length !== 0 && this.uri) {
        return [[this.uri, playBack]]
      }
      return []
    },
    isPlaying () {
      return isMediaPlayingState(this.combinePlayBackUri)
    }
  },
  methods: {
    handleClickMedia () {
      this.$emit('click', this.media)
    },
    handleClickPlay () {
      const payload = {
        isPlaying: this.isPlaying,
        uri: this.uri
      }
      this.$emit('click-play', payload)
    }
  }
}
</script>
<style lang="scss" scoped>
.media {
  &__container {
    background-color: #181818;
    padding: 1rem;
    border-radius: 4px;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #282828;
    }
  }
  &__cover {
    margin-bottom: 1rem;
    position: relative;
  }
  &__click {
    bottom: 0;
    content: "";
    cursor: pointer;
    left: 0;
    overflow: hidden;
    right: 0;
    text-indent: 100%;
    top: 0;
    white-space: nowrap;
    position: absolute;
    z-index: 1;
  }
  &__song-name {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    text-decoration: none;
    &_text {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      @include clamp-text(1);
    }
  }
  &__play {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: all 0.2s ease-in;
    z-index: 3;
  }
  &__desc {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 16px;
    color: #b3b3b3;
    text-transform:capitalize;
    .comma {
      letter-spacing: 1px;
      margin-left: -4px;
    }
    @include clamp-text(2);
    a {
      position: relative;
      z-index: 1;
      color: #b3b3b3;
    }
  }
  &:hover {
    .media {
      &__play {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
