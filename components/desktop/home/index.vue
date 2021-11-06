<template>
  <div class="home">
    <div class="home__container">
      <s-greeting />
      <s-layout-container>
        <s-media v-for="i in 6" :key="i" />
      </s-layout-container>
    </div>
  </div>
</template>
<script>
import SGreeting from '~/components/desktop/home/greeting'
import SLayoutContainer from '~/components/shared/ui/layout-container'
import SMedia from '~/components/shared/ui/media'

export default {
  components: {
    SGreeting,
    SLayoutContainer,
    SMedia
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding: 1.5rem;
  &__container {
    display: grid;
    grid-gap: 1.5rem;
  }
}
</style>
