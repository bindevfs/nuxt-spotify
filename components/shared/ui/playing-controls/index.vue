<template>
  <div class="playing-controls">
    <div class="playing-controls__container">
      <div class="playing-controls__control">
        <div class="controls">
          <div class="controls__wrapper">
            <div class="controls__item">
              <div class="controls__icon" @click="handleClickPrev">
                <span class="icon icon-prev"></span>
              </div>
            </div>
            <div class="controls__item">
              <a-icon :type="!isPlaying ? 'play-circle' : 'pause-circle'" @click="handleClickTogglePlay" />
            </div>
            <div class="controls__item">
              <div class="controls__icon" @click="handleClickNext">
                <span class="icon icon-next"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="playing-controls__timeline">
        <div class="track-time">
          <div class="track-time__wrapper">
            <div class="track-time__duration">{{ progress | duration }}</div>
            <div class="track-time__line">
              <a-slider
                v-model="progress"
                :tip-formatter="null"
                :max="songDuration"
                class="track-time__slider"
                @afterChange="handleMoveSeek($event)"
              />
            </div>
            <div class="track-time__duration">{{ songDuration | duration }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      progressInterval: null,
      progress: 0,
      songDuration: 0
    }
  },
  computed: {
    ...mapGetters('playback', {
      playback: 'getPlayback',
      isPlaying: 'isPlaying'
    })
  },
  watch: {
    playback (val) {
      this.songDuration = this.playback.duration
      this.progress = this.playback?.position
      this.updateProgress()
    }
  },
  created() {
    this.updateProgress()
    this.songDuration = this.playback.duration
  },
  methods: {
    ...mapActions('playback', {
      'next': 'next',
      'prev': 'prev',
      'seek': 'seek',
      'togglePlay': 'togglePlay'
    }),
    updateProgress() {
      clearInterval(this.progressInterval)
      this.progress = this.playback?.position
      if (!this.playback.paused) {
        this.progressInterval = setInterval(() => {
          if (this.playback && this.progress + 1000 <= this.songDuration) {
            this.progress = this.progress + 1000
          }
        }, 1000)
      }
    },
    async handleClickTogglePlay () {
      await this.togglePlay({ isPlaying: this.isPlaying })
    },
    async handleClickNext() {
      await this.next()
    },
    async handleClickPrev () {
      await this.prev()
    },
    async handleMoveSeek (positionMs) {
      this.progress = positionMs
      if (typeof positionMs === 'number') {
        await this.seek(positionMs)
      }
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
  &__slider {
    margin: 0;
  }
}
</style>
