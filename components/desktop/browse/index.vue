<template>
  <div class="browse">
    <div class="browse__list">
      <div v-for="(category, index) in browseCategories" :key="index" class="browse-item">
        <nuxt-link :to="`/browse/${category.id}`" class="browse-item__contain">
          <div class="browse-item__title">{{ category.name }}</div>
          <div class="browse-item__wrap-img">
            <img :src="category.icons[0].url" :alt="category.name" loading="lazy"/>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async fetch() {
    await this.$store.dispatch('browse/getBrowseAllCategoriesAction')
  },
  computed: {
    browseCategories () {
      return this.$store.state.browse.browseCategories
    }
  }
}
</script>
<style lang="scss" scoped>
.browse {
  padding: 1.5rem;
  &__list {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
  }
  .browse-item {
    position: relative;
    padding-top: 100%;
    background: #333;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    &__title {
      position: absolute;
      bottom: 0;
      left: 50%;
      color: #fff;
      font-weight: 700;
      letter-spacing: -.04em;
      line-height: 1.3em;
      max-width: 100%;
      word-wrap: break-word;
      font-size: 24px;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
      z-index: 2;
    }
    &__wrap-img {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      @include box-shadow(0 2px 4px 0 rgba(0, 0, 0, 0.2));
      img {
        width: inherit;
        height: inherit;
      }
    }
  }
}
</style>
