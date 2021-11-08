<template>
  <section class="layout">
    <div class="layout__container">
      <s-top-bar />
      <div class="layout__view">
        <div class="layout__sticky-top-scroll"></div>
        <div class="layout__bg-linear"></div>
        <nuxt />
      </div>
      <s-nav-bar />
      <s-now-playing-bar />
    </div>
  </section>
</template>
<script>
import SNavBar from '~/components/shared/ui/navbar'
import STopBar from '~/components/shared/ui/top-bar'
import SNowPlayingBar from '~/components/shared/ui/now-playing-bar'

export default {
  components: {
    SNavBar,
    STopBar,
    SNowPlayingBar
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('.layout__view').addEventListener('scroll', this.handleScroll)
    })
    this.$store.dispatch('player/initPlayer')
    this.initAuth()
  },
  methods: {
    initAuth () {
      this.$store.dispatch('auth/initAuth')
      console.log('this.$route.hash', this.$route.hash.split('&'))
      const a = this.$route.hash.split('&').reduce(function(obj, str, index) {
        const strParts = str.split("=");
        console.log('strParts', strParts)
        if (strParts[0] && strParts[1]) {
          obj[strParts[0].replace(/\s+/g, '')] = strParts[1].trim();
        }
        return obj;
      }, {});
      console.log('a', a)
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
  &__sticky-top-scroll {
    position: sticky;
    top: 0;
    height: 60px;
    z-index: 2;
  }
}
</style>
