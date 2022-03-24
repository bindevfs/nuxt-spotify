<template>
  <div class="layout-container">
    <div class="layout-container__wrapper">
      <div class="layout-container__head">
        <h2 class="layout-container__title">
          <a v-if="isLinkTitle" href="javascript:void(0)" class="layout-container__title-link" @click="$emit('clickTitle')">
            {{ title }}
          </a>
          <template v-else>
            {{ title }}
          </template>
        </h2>
        <div v-if="isViewAll" class="layout-container__view-all">
          <a href="javascript:void(0)" class="layout-container__link" @click="$emit('clickAll')">SEE ALL</a>
        </div>
      </div>
      <div class="layout-container__body">
        <div class="layout-container__list">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isString } from 'lodash-es'

export default {
  props: {
    header: {
      type: [String, Object],
      required: true
    },
    isViewAll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isLinkTitle () {
      return !isString(this.header)
    },
    title () {
      if (!this.isLinkTitle) {
        return this.header
      }
      return this.header?.title?.name || ''
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-container {
  &__wrapper {
    display: flex;
    flex-direction: column;
  }
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.5rem;
  }
  &__title {
    font-weight: bold;
    font-size: 28px;
    line-height: 35px;
    color: #fff;
    margin: 0;
  }
  &__view-all {
    background: transparent;
    white-space: nowrap;
    margin-left: 0.5rem;
  }
  &__link {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .1em;
    line-height: 16px;
    text-transform: uppercase;
    color: #b3b3b3;
  }
  &__list {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill,minmax(196px, 1fr));
  }
}
</style>
