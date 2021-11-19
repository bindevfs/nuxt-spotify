<template>
  <div :class="['media-thumbnail', { 'media-thumbnail--bordered': bordered }]">
    <img
      class="media-thumbnail__img"
      :src="srcImage"
      :alt="alt"
      loading="lazy"
    >
  </div>
</template>
<script>
export default {
  props: {
    srcImage: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.media-thumbnail {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-color: #333;
  border-radius: 2px;
  @include box-shadow(0 8px 24px rgba(0, 0, 0, 0.5));
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
  &--bordered {
    border-radius: 50%;
  }
}
</style>
