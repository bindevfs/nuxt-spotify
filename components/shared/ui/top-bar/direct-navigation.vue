<template>
  <div class="direct-navigation">
    <div class="direct-navigation__inner">
      <div class="direct-navigation__circle" @click="back">
        <i class="icon icon-arrow-left"></i>
      </div>
      <div class="direct-navigation__circle" @click="forward">
        <i class="icon icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    back () {
      window.history.back()
    },
    forward () {
      window.history.forward();
    }
  }
}
</script>
<style lang="scss" scoped>
.direct-navigation {
  &__inner {
    display: flex;
    gap: 0.5rem;
  }
  &__circle {
    background-color: rgba(0,0,0,.7);
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
