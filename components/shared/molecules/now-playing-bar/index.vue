<template>
  <div class="playing-bar">
    <div class="playing-bar__container">
      <div v-if="currentTrack" class="playing-bar__wrapper">
        <div class="playing-bar__left">
          <s-track-info />
        </div>
        <div class="playing-bar__center">
          <s-playing-controls />
        </div>
        <div class="playing-bar__right">
          <div class="sound">
            <div class="sound__icon" @click="toggleOnOfSoundVolume">
              <span :class="['icon', volumeCurrent > 0 ? ' icon-sound-on' : ' icon-sound-off']"></span>
            </div>
            <div class="sound__slider">
              <a-slider
                v-model="volumeCurrent"
                :tip-formatter="null"
                :max="100"
                @afterChange="handleMoveVolume($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        loading.....
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { debounce } from 'lodash-es'

export default {
  components: {
    STrackInfo: () => import('~/components/shared/ui/track-info/index.vue'),
    SPlayingControls: () => import('~/components/shared/ui/playing-controls/index.vue')
  },
  data () {
    return {
      volumeCurrent: 0,
      beforeMutedVolume: 0
    }
  },
  computed: {
    ...mapGetters({
      currentTrack: 'playback/currentTrack',
      volume: 'playback/volume'
    })
  },
  mounted() {
    this.volumeCurrent = Math.floor(this.volume * 100)
  },
  methods: {
    handleMoveVolume: debounce(async function(volume) {
      this.volumeCurrent = volume
      await this.$playerApi.setVolume(volume)
    }, 300),
    toggleOnOfSoundVolume () {
      if (this.volumeCurrent > 0) {
        this.beforeMutedVolume = this.volumeCurrent
        this.handleMoveVolume(0)
      } else {
        this.handleMoveVolume(this.beforeMutedVolume);
      }
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
