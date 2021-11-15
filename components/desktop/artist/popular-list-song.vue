<template>
  <div class="popular">
    <div class="popular__list">
      <div v-for="(song, index) in songs" :key="index" class="popular__item">
        <div class="popular__inner">
          <div class="popular__first">
            <div class="popular__stt">{{ (index + 1) }}</div>
            <div class="popular__artist">
              <div class="popular__artist-wrap_img">
                <img :src="song.album.images[0].url" :alt="song.name">
              </div>
              <div class="popular__artist-name">{{ song.name }}</div>
            </div>
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
    }
  }
}
</script>
<style lang="scss" scoped>
.popular {
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__item {
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-radius: 4px;
    &:hover {
      background-color: rgba(255,255,255,0.3);
    }
  }
  &__stt, &__views, &__time {
    color: #b3b3b3;
  }
  &__stt {
    flex: 0 0 5%;
    text-align: center;
  }
  &__inner {
    display: grid;
    grid-template-columns: 1fr 20vw 20vw;
    align-items: center;
    justify-items: center;
    grid-gap: 1rem;
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
