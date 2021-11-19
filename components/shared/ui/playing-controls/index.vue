<template>
  <div class="playing-controls">
    <div class="playing-controls__container">
      <div class="playing-controls__control">
        <div class="controls">
          <div class="controls__wrapper">
            <div class="controls__item">
              <div class="controls__icon">
                <span class="icon icon-prev"></span>
              </div>
            </div>
            <div class="controls__item">
              <a-icon :type="isPlaying ? 'play-circle' : 'pause-circle'" @click="isPlaying = !isPlaying" />
            </div>
            <div class="controls__item">
              <div class="controls__icon">
                <span class="icon icon-next"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="playing-controls__timeline">
        <div class="track-time">
          <div class="track-time__wrapper">
            <div class="track-time__duration">0:00</div>
            <div class="track-time__line">
              <s-track-time-line />
            </div>
            <div class="track-time__duration">3:55</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    STrackTimeLine: () => import('~/components/shared/ui/slider-timeline/index.vue')
  },
  data () {
    return {
      isPlaying: false
    }
  }
}
</script>
<style lang="scss" scoped>
.playing-controls {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  &__timeline {
    flex: 1;
    width: 100%;
  }
}
.controls {
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 1.5rem
  }
  &__item {
    .anticon {
      font-size: 30px;
      cursor: pointer;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1);
      }
    }
    .icon {
      transition: color 0.2s ease;
      &::before {
        color: #b3b3b3;
      }
      &:hover {
        &::before {
          color: #fff;
        }
      }
    }
  }
  &__icon {
    cursor: pointer;
  }
}

.track-time {
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__line {
    flex: 1;
  }
  &__duration {
    color: #b3b3b3;
    font-size: 11px;
    line-height: 16px;
    font-weight: 400;
  }
}
</style>