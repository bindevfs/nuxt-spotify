<template>
  <div class="action">
    <div class="action__play">
      <s-play-button
        size="64px"
        :size-icon="32"
        :is-playing="isPlaying"
        @click="$emit('click-play')"
      />
    </div>
    <div class="action__follow">
      <a-button>
        Follow
      </a-button>
    </div>
    <div class="action__more"></div>
  </div>
</template>
<script>
export default {
  components: {
    SPlayButton: () => import('~/components/shared/ui/play-button/index.vue'),
  },
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  gap: 1.5rem;
  &__follow {
    .ant-btn {
      background-color: transparent;
      border: 1px solid rgba(255,255,255,.3);
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .1em;
      line-height: 16px;
      padding: 7px 15px;
      text-align: center;
      text-transform: uppercase;
    }
  }
}
</style>
