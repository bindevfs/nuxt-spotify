<template>
  <header class="top-bar">
    <div class="top-bar__container">
      <div class="top-bar__inner">
        <div class="top-bar__left">
          <s-direct-navigation />
        </div>
        <div v-if="user" class="top-bar__right">
          <s-profile-avatar />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  components: {
    SProfileAvatar: () => import('~/components/shared/ui/top-bar/profile'),
    SDirectNavigation: () => import('~/components/shared/ui/top-bar/direct-navigation')
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  }
}
</script>
<style lang="scss" scoped>
.top-bar {
  grid-area: main-view;
  z-index: 3;
  display: flex;
  height: $header-height;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  transition: background 0.6s ease;
  &--scroll {
    background: #121212;
  }
  &__container {
    flex: 1;
  }
  &__inner {
    @include flex-center;

    justify-content: space-between;
  }
}
</style>
