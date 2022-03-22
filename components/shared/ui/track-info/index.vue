<template>
  <div class="track-info">
    <div class="track-info__wrap-img">
      <img :src="imgThumb" :alt="currentTrack.name">
    </div>
    <div class="track-info__content">
      <div class="track-info__name">
        {{ currentTrack.name }}
      </div>
      <div class="track-info__artists">
        <div v-for="(artist, idx) in currentTrack.artists" :key="idx">
          <span v-if="idx !== 0"> ,</span>
          <nuxt-link :to="`/${artist.artistUrl}`">{{ artist.name }}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentTrack () {
      return this.$store.getters['playback/currentTrack']
    },
    imgThumb () {
      return this.currentTrack?.album?.images[0]?.url
    }
  }
}
</script>
<style lang="scss" scoped>
.track-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  &__wrap-img {
    position: relative;
    max-width: 60px;
    height: 60px;
    flex: 0 0 20%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__name {
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    @include clamp-text;
  }
  &__artists {
    font-size: 11px;
    line-height: 13px;
    color: #b3b3b3;
    margin-top: 4px;
    display: flex;
  }
}
</style>
