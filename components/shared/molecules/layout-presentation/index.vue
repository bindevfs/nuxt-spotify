<template>
  <section class="presentation">
    <div v-if="isLoading" class="presentation__loading">
      <s-loading-dots />
    </div>
    <div v-else class="presentation__container">
      <div class="presentation__head" :style="backgroundColorRandomRGB">
        <div class="presentation__head-bg"></div>
        <div class="presentation__head-contain">
          <div class="presentation-thumbnail">
            <div :class="[
              'presentation-thumbnail__wrap-img',
              { 'presentation-thumbnail__wrap-img--rounded': rounded }
            ]">
              <img id="image" :src="thumbUrl" alt="Image">
            </div>
          </div>
          <div class="presentation-info">
            <div class="presentation-info__verified"></div>
            <h1 class="presentation-info__name">
              <slot name="name"></slot>
            </h1>
            <div class="presentation-info__desc">
              <slot name="desc"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="presentation__body">
        <div class="presentation__bg-linear" :style="backgroundColorRandomRGB"></div>
        <slot name="body"></slot>
      </div>
    </div>
  </section>
</template>
<script>
import { getRandomRgb } from '~/helpers'
import SLoadingDots from '~/components/shared/ui/loading-dots/index.vue'

export default {
  components: {
    SLoadingDots
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    backgroundHeadColor: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: true
    },
    thumbUrl: {
      type: String,
      default: 'https://i.scdn.co/image/ab6761610000e5eb76868742627e5f87962d8be0'
    }
  },
  computed: {
    backgroundColorRandomRGB () {
      if (this.backgroundHeadColor) {
        return {
          '--bg-color': this.backgroundHeadColor
        }
      }
      return {
        '--bg-color': getRandomRgb()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.presentation {
  --bg-color: rgb(56, 144, 160);
  &__head {
    min-height: 350px;
    max-height: 500px;
    height: 35vh;
    background: var(--bg-color);
    display: flex;
    align-items: center;
    padding: 4rem 1.5rem 1.5rem;
    position: relative;
    z-index: 1;
    transition: all 0.2s ease-in-out;
    &-contain {
      display: flex;
      align-items: flex-end;
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
    position: relative;
    z-index: 1;
  }
  &__bg-linear {
    background: linear-gradient(rgba(0,0,0,.6) 0,#121212 100%), var(--bg-color);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vw;
    z-index: -1;
  }
  &__more {
    margin: 2rem 0;
  }
  .presentation-thumbnail {
    width: 17.5vw;
    height: 17.5vw;
    margin-right: 1.5rem;
    &__wrap-img {
      position: relative;
      width: 100%;
      height: 100%;
      padding-top: 100%;
      border-radius: 0;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
        @include box-shadow(0 4px 60px rgba(0, 0, 0, 0.5));
      }
      &--rounded {
        border-radius: 50%;
      }
    }
  }
  .presentation-info {
    &__name {
      font-size: calc(6.9vw - 1rem);
      line-height: 112px;
      font-weight: 900;
      text-transform: none;
      color: #fff;
      margin: 0;
    }
    &__desc {
      font-size: 16px;
      line-height: 2;
      margin-top: 4px;
      color: #fff;
    }
  }
}

.presentation-action {
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
