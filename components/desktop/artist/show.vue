<template>
  <section class="artist">
    <div class="artist__container">
      <div class="artist__head">
        <div class="artist__head-bg"></div>
        <div class="artist__head-contain">
          <div class="artist-thumbnail">
            <div class="artist-thumbnail__wrap-img">
              <img :src="artistImageUrl" :alt="artist.name">
            </div>
          </div>
          <div class="artist-info">
            <div class="artist-info__verified"></div>
            <h1 class="artist-info__name">{{ artist.name }}</h1>
            <div class="artist-info__listeners">{{ artist.followers.total }} Followers</div>
          </div>
        </div>
      </div>
      <div class="artist__body">
        <div class="artist-action">
          <div class="artist-action__play">
            <s-play-button size="64px" :size-icon="32"/>
          </div>
          <div class="artist-action__follow">
            <a-button>
              Follow
            </a-button>
          </div>
          <div class="artist-action__more"></div>
        </div>
        <s-popular-list-song :songs="topTracks"/>
      </div>
    </div>
  </section>
</template>
<script>
import SPlayButton from '~/components/shared/ui/play-button'
import SPopularListSong from '~/components/desktop/artist/popular-list-song.vue'

export default {
  components: {
    SPlayButton,
    SPopularListSong
  },
  async fetch() {
    await this.$store.dispatch('artists/getArtistTopTrackAction', this.$route.params.id)
    await this.$store.dispatch('artists/getArtistAction', this.$route.params.id)

  },
  computed: {
    topTracks () {
      return this.$store.state.artists.topTracks
    },
    artist () {
      return this.$store.state.artists.artist
    },
    artistImageUrl () {
      return this.artist?.images?.[0]?.url
    }
  }
}
</script>
<style lang="scss" scoped>
.artist {
  &__head {
    min-height: 350px;
    max-height: 500px;
    height: 35vh;
    background-color: rgb(56, 144, 160);
    display: flex;
    align-items: center;
    padding: 1.5rem;
    position: relative;
    z-index: 1;
    &-contain {
      display: flex;
      align-items: end;
    }
    &-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%);
    }
  }
  &__body {
    padding: 1.5rem 2rem;
  }
  .artist-thumbnail {
    width: 17.5vw;
    height: 17.5vw;
    margin-right: 1.5rem;
    &__wrap-img {
      position: relative;
      width: 100%;
      height: 100%;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        @include box-shadow(0 4px 60px rgba(0, 0, 0, 0.5));
      }
    }
  }
  .artist-info {
    &__name {
      font-size: calc(6.9vw - 1rem);
      line-height: 112px;
      font-weight: 900;
      text-transform: none;
      color: #fff;
      margin: 0;
    }
    &__listeners {
      font-size: 16px;
      line-height: 2;
      margin-top: 4px;
      color: #fff;
    }
  }
}

.artist-action {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  gap: 1.5rem;
  &__follow {
    .ant-btn {
      background-color: transparent;
      border: 1px solid rgba(255,255,255,.3);
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .1em;
      line-height: 16px;
      padding: 7px 15px;
      text-align: center;
      text-transform: uppercase;
    }
  }
}
</style>
