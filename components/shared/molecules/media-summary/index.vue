<template>
  <div class="media-summary">
    <div class="media-summary__contain">
      <div class="media-summary__avatar">
        <img :src="mediaSummary.imageUrl" :alt="mediaSummary.name" class="media-summary__img">
      </div>
      <div class="media-summary__items">
        <div class="media-summary__type">{{ mediaSummary.type }}</div>
        <div class="media-summary__name">{{ mediaSummary.name }}</div>
        <div v-if="mediaSummary.artists" class="media-summary__artists">
          <nuxt-link
            v-for="(artist, idx) in mediaSummary.artists"
            :key="idx"
            :to="`/artist/${artist.id}`"
          >
            {{ artist.name }}
          </nuxt-link>
        </div>
        <div v-if="mediaSummary.description" class="media-summary__desc">
          {{ mediaSummary.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mediaSummary: {
      type: Object,
      default: () => ({
        imageUrl: '',
        name: '',
        type: '',
        artists: [],
        description: ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.media-summary {
  &__contain {
    display: flex;
    align-items: flex-end;
  }

  &__items {
    margin-left: 2rem;
    flex: 1;
  }

  &__avatar {
    position: relative;
    width: calc(clamp(233px, 31vw, 250px));
    height: calc(clamp(233px, 31vw, 250px));
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__type {
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    text-transform: uppercase;

  }

  &__name {
    font-size: 48px;
    line-height: 48px;
    padding: 0.08em 0;
    font-weight: 900;
  }

  &__desc {
    font-size: 16px;
    line-height: 2;
    margin-top: 4px;
    color: #fff;
  }
}
</style>
