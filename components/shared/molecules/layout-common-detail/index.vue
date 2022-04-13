<template>
  <div class="detail">
    <div v-if="isLoading" class="detail__loading">
      <s-loading-dots />
    </div>
    <div v-else class="detail__container">
      <div class="detail__head">
        <slot name="media-summary"></slot>
      </div>
      <div class="detail__body">
        <div v-if="$slots.actions" class="detail__action">
          <slot name="actions"></slot>
        </div>
        <div class="detail__list-song">
          <slot name="tracks"></slot>
        </div>
        <div v-if="$slots.more" class="detail__more">
          <slot name="more"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    SLoadingDots: () => import('~/components/shared/ui/loading-dots/index.vue')
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  &__head {
    min-height: 350px;
    max-height: 500px;
    height: 35vh;
    display: flex;
    align-items: flex-end;
    padding: 0 32px 24px;
  }
  &__body {
    padding: 0 2rem 2rem;
  }
  &__more, &__list-song {
    padding: 1rem 0;
  }
}
</style>
