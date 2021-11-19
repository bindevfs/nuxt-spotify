<template>
  <div class="popular">
    <div v-if="visibleHeader" class="popular__header">
      <div class="popular__header-item">#</div>
      <div class="popular__header-item">Title</div>
      <div class="popular__header-item">Views</div>
      <div class="popular__header-item">Times</div>
    </div>
    <div class="popular__list">
      <div v-for="(song, index) in songs" :key="index" class="popular__item">
        <div class="popular__inner">
          <div class="popular__stt">{{ (index + 1) }}</div>
          <div class="popular__artist">
            <div class="popular__artist-wrap_img">
              <img :src="song.album.images[0].url" :alt="song.name">
            </div>
            <div class="popular__artist-name">{{ song.name }}</div>
          </div>
          <div class="popular__views">4,246,849</div>
          <div class="popular__time">{{ song.duration_ms | durationToMinutes }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    visibleHeader: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.popular {
  --grid-column: 1vw 1fr 20vw 5vw;
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
    border-bottom: 1px solid rgba(255,255,255,.1);
    margin-bottom: 2rem;
    &-item {
      padding: 0.5rem 0;
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__item {
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-radius: 4px;
    padding: 0 1rem;
    &:hover {
      background-color: rgba(255,255,255,0.3);
    }
  }
  &__stt, &__views, &__time {
    color: #b3b3b3;
  }
  &__stt {
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
}
</style>
