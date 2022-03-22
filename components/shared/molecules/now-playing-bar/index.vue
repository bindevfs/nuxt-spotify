<template>
  <div class="playing-bar">
    <div class="playing-bar__container">
      <div class="playing-bar__wrapper">
        <div class="playing-bar__left">
          <s-track-info v-if="currentTrack"/>
        </div>
        <div class="playing-bar__center">
          <s-playing-controls />
        </div>
        <div class="playing-bar__right">
          <div class="sound">
            <div class="sound__icon">
              <span class="icon icon-sound-on"></span>
            </div>
            <div class="sound__slider">
              <s-track-time-line />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    STrackInfo: () => import('~/components/shared/ui/track-info/index.vue'),
    SPlayingControls: () => import('~/components/shared/ui/playing-controls/index.vue'),
    STrackTimeLine: () => import('~/components/shared/ui/slider-timeline/index.vue')
  },
  computed: {
    currentTrack () {
      return this.$store.getters['playback/currentTrack']
    }
  }
}
</script>
<style lang="scss" scoped>
.playing-bar {
  padding: 1rem;
  grid-area: now-playing;
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__left, &__right {
    flex: 0 0 30%;
  }
  &__center {
    flex: 0 0 40%;
  }
}

.sound {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &__icon {
    cursor: pointer;
    display: flex;
    margin-right: 0.5rem;
    .icon {
      font-size: 18px;
    }
  }
  &__slider {
    flex: 0 0 40%;
    max-width: 9rem;
  }
}
</style>
