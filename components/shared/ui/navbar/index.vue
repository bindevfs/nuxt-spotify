<template>
  <nav class="navbar">
    <div class="navbar__container">
      <div class="navbar__head">
        <div class="navbar__logo">
          <img src="/images/logo/spotify.svg" alt="Logo Spotify" />
        </div>
      </div>
      <div class="navbar__body">
        <s-nav-list :nav-list="navList" />
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  components: {
    SNavList: () => import('~/components/shared/ui/navbar/nav-list/index.vue')
  },
  data () {
    return {
      navList: [
        {
          id: 1,
          title: 'Home',
          icon: 'home',
          link: '/'
        },
        {
          id: 2,
          title: 'Search',
          icon: 'search',
          link: '/search'
        },
        {
          id: 3,
          title: 'Your Library',
          icon: 'library',
          link: '/library'
        },
        {
          id: 4,
          title: 'Browse',
          icon: 'library',
          link: '/browse'
        },
        {
          id: 5,
          title: 'Like Songs',
          icon: 'heart',
          link: '/collection/track'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  grid-area: nav-bar;
  background: #030303;
  min-height: 0;
  padding: 1.5rem 0;
  &__logo {
    min-width: 148px;
    height: 44px;
    object-fit: cover;
    padding: 0 1rem;
    margin-bottom: 24px;
  }
}
</style>
