<template>
  <div class="play-button">
    <button class="play-button__play" aria-label="Play">
      <span class="icon icon-play"></span>
    </button>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.play-button {
  &__play {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    min-width: 40px;
    border-radius: 100px;
    border: none;
    background-color: #1db954;
    color: #fff;
    transition: transform 33ms cubic-bezier(.3,0,0,1), -webkit-transform 33ms cubic-bezier(.3,0,0,1);
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
