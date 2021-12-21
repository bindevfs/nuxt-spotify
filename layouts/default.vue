<template>
  <section class="layout">
    <div class="layout__container">
      <s-top-bar />
      <div class="layout__view">
        <div class="layout__bg-linear"></div>
        <transition name="home" mode="out-in">
          <nuxt keep-alive :keep-alive-props="{ max: 5 }" />
        </transition>
      </div>
      <s-nav-bar />
      <s-now-playing-bar />
    </div>
  </section>
</template>
<script>
import SNavBar from '~/components/shared/ui/navbar'
import STopBar from '~/components/shared/ui/top-bar'
import SNowPlayingBar from '~/components/shared/molecules/now-playing-bar'

export default {
  components: {
    SNavBar,
    STopBar,
    SNowPlayingBar
  },
  computed: {
    visibleStickyTop () {
      return this.$route.name === 'index' || this.$route.name === 'browse'
    }
  },
  mounted () {
    this.initAuth()
    this.$store.dispatch('player/initPlayer', this.$store.state.auth.accessToken)
    this.$nextTick(() => {
      document.querySelector('.layout__view').addEventListener('scroll', this.handleScroll)
    })
  },
  methods: {
    initAuth () {
      this.$store.dispatch('auth/initAuth')
    },
    handleScroll () {
      const scrollTop = document.querySelector('.layout__view').scrollTop
      if (scrollTop === 0) {
        document.querySelector('.top-bar').classList.remove('top-bar--scroll')
      } else {
        document.querySelector('.top-bar').classList.add('top-bar--scroll')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  --nav-bar-width: #{$nav-bar-width};
}
.layout {
  background-color: #121212;
  height: 100%;
  &__container {
    display: grid;
    grid-template-areas: "nav-bar main-view"
                          "now-playing now-playing";
    grid-template-columns: calc(var(--nav-bar-width) + 2%) 1fr;
    grid-template-rows: 1fr auto;
    height: 100%;
    min-height: 100%;
    position: relative;
    width: 100%;
  }
  &__view {
    grid-area: main-view;
    overflow: auto;
    position: relative;
    z-index: 2;
    transition: background 0.5s ease-in-out;
  }
  &__bg-linear {
    position: absolute;
    background-color: rgb(240, 216, 216);
    background-image: linear-gradient(rgba(0,0,0,.6) 0,#121212 100%);
    top: 0;
    right: 0;
    width: 100%;
    height: 20vw;
    z-index: -1;
  }
}
</style>
