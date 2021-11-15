<template>
  <div class="play-button" :style="{'--size': size}">
    <button class="play-button__play" aria-label="Play">
      <svg :width="sizeIcon" :height="sizeIcon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5824 7.99998L1.41748 15.6V0.399975L14.5824 7.99998Z" fill="white"/>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: '40px'
    },
    sizeIcon: {
      type: Number,
      default: 20
    }
  }
}
</script>
<style lang="scss" scoped>
.play-button {
  --size: 40px;
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
    transition: transform 33ms cubic-bezier(.3,0,0,1), -webkit-transform 33ms cubic-bezier(.3,0,0,1);
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
    }
    svg {
      padding-left: 4px;
    }
  }
}
</style>
