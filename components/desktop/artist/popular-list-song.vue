<template>
  <div class="popular">
    <div v-if="visibleHeader" class="popular__header">
      <div class="popular__header-item">#</div>
      <div class="popular__header-item">Title</div>
      <div class="popular__header-item">Times</div>
    </div>
    <div class="popular__list">
      <div
        v-for="(song, index) in songs"
        :key="index"
        :class="[
          'popular__item',
          { 'popular__item--active': song.is_playing_current }
        ]"
      >
        <div class="popular__inner">
          <div v-if="song.is_playing_current" class="popular__sound-bar">
            <s-sound-bar />
          </div>
          <div v-else class="popular__stt">{{ (index + 1) }}</div>
          <div v-if="type === 'artist'" class="popular__artist">
            <div class="popular__artist-wrap_img">
              <img :src="song.album.images[0].url" :alt="song.name">
            </div>
            <div class="popular__artist-name">{{ song.name }}</div>
          </div>
          <div v-else class="popular__album">
            <div class="popular__album-name">{{ song.name }}</div>
            <div class="popular__album-artists">
              <nuxt-link
                v-for="(artist, idx) in song.artists"
                :key="idx"
                :to="`/artist/${artist.id}`"
              >
                {{ artist.name }}
              </nuxt-link>
            </div>
          </div>
          <div class="popular__time">{{ song.duration_ms | durationToMinutes }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    SSoundBar: () => import('~/components/shared/ui/sound-bar/index.vue')
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    visibleHeader: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'artist'
    }
  }
}
</script>
<style lang="scss" scoped>
.popular {
  --grid-column: 1vw 1fr 20vw;
  --grid-gap: 1rem;

  &__header, &__inner {
    display: grid;
    grid-template-columns: var(--grid-column);
    align-items: center;
    grid-gap: var(--grid-gap);
    padding: 0 1rem;
  }

  &__header {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: .1em;
    line-height: 16px;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(255, 255, 255, .1);
    margin-bottom: 2rem;

    &-item {
      padding: 0.5rem 0;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__artist {
    display: flex;
    align-items: center;

    &-name {
      margin-left: 1rem;
    }

    &-wrap_img {
      width: 40px;
      height: 40px;

      img {
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }
  }

  &__stt, &__views, &__time {
    color: #b3b3b3;
  }

  &__album {
    &-artists a {
      color: #b3b3b3;
      font-size: 14px;
    }
  }

  &__item {
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-radius: 4px;
    padding: 0 1rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &--active {
      .popular {
        &__artist-name, &__time, &__album {
          color: #1db954;
        }
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__stt, &__sound-bar {
    flex: 0 0 5%;
  }

  &__inner {
    padding: 0.5rem 0;
  }

  &__first {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
}
</style>
