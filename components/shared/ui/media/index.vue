<template>
  <div class="media">
    <div class="media__container" @click="handleClickMedia">
      <div class="media__cover">
        <s-media-thumbnail :bordered="isTypeArtist" :src-image="imagePath" :alt="name"/>
        <div class="media__play" @click="handleClickPlay">
          <s-play-button />
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
            <nuxt-link
              :key="`${index}_${artist.id}`"
              :to="`/artist/${artist.id}`">
              {{ artist.name }}
            </nuxt-link>
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
      return this.item?.track ? this.item?.track : this.item
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
      if (this.isTypePlayList || this.isTypeArtist) {
        return this.media?.images[0]?.url || ''
      }
      return this.media?.album?.images[0]?.url || ''
    }
  },
  mounted() {
    console.log(this.item)
  },
  methods: {
    handleClickMedia () {
      console.log('eff')
      this.$emit('click', this.media)
    },
    handleClickPlay () {
      console.log('e')
      this.$emit('clickPlay', this.media)
    }
  }
}
</script>
<style lang="scss" scoped>
.media {
  cursor: pointer;
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
