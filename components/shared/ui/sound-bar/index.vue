<template>
  <div class="bar">
    <div class="bar__inner">
      <div class="bar__item"></div>
      <div class="bar__item"></div>
      <div class="bar__item"></div>
      <div class="bar__item"></div>
      <div class="bar__item"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    paused: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.bar {
  position: relative;
  width: 30px;
  height: 40px;
  &__inner {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  &__item {
    background: #1DB954;
    bottom: 1px;
    height: 3px;
    position: absolute;
    width: 3px;
    animation: sound 0ms -800ms linear infinite alternate;
    &:nth-child(1) {
      left: 1px;
      animation-duration: 474ms;
    }

    &:nth-child(2) {
      left: 5px;
      animation-duration: 433ms;
    }

    &:nth-child(3) {
      left: 9px;
      animation-duration: 407ms;
    }

    &:nth-child(4) {
      left: 13px;
      animation-duration: 458ms;
    }

    &:nth-child(5) {
      left: 17px;
      animation-duration: 400ms;
    }
  }
}

@keyframes sound {
  0% {
    opacity: .35;
    height: 3px;
  }
  100% {
    opacity: 1;
    height: 28px;
  }
}
</style>
