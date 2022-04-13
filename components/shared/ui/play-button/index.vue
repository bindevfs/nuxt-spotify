<template>
  <div class="play-button" :style="{'--size': size}" @click="$emit('click', isPlaying)">
    <button class="play-button__play" aria-label="Play">
      <svg v-show="!isPlaying" height="28" width="28" viewBox="0 0 24 24">
        <path
          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
      </svg>
      <svg v-show="isPlaying" height="28" width="28" viewBox="0 0 24 24">
        <path
          d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: '48px'
    },
    sizeIcon: {
      type: Number,
      default: 20
    },
    isPlaying: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.play-button {
  --size: 48px;

  &__play {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--size);
    min-width: var(--size);
    border-radius: 100px;
    border: none;
    background-color: #1db954;
    color: #fff;
    transition: transform 33ms cubic-bezier(.3, 0, 0, 1), -webkit-transform 33ms cubic-bezier(.3, 0, 0, 1);
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
    }

    svg {
      //padding-left: 4px;
    }
  }
}
</style>
