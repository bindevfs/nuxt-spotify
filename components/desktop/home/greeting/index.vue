<template>
  <div class="greeting">
    <div class="greeting__head">
      <h2 class="greeting__title">Good {{ getMessage }}</h2>
    </div>
    <div class="greeting__body">
      <s-recently-played />
    </div>
  </div>
</template>
<script>
import SRecentlyPlayed from '~/components/desktop/home/recently-played'

export default {
  components: {
    SRecentlyPlayed
  },
  computed: {
    getMessage () {
      const now = new Date()
      const hour = now.getHours()
      return hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'
    }
  }
}
</script>
<style lang="scss" scoped>
.greeting {
  &__title {
    font-size: 2rem;
    line-height: 36px;
    font-weight: 700;
    color: #fff;
  }
}
</style>
