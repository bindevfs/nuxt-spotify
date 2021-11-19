<template>
  <ul class="nav-list">
    <li v-for="item in navList" :key="item.id" class="nav-list__item">
      <nuxt-link :to="item.link" class="nav-list__link">
        <div :class="['nav-list__icon', { 'nav-list__icon--heart': item.icon === 'heart'}]">
          <span :class="'icon icon-' + item.icon"></span>
        </div>
        <div class="nav-list__text-link">
          {{ item.title }}
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    navList: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  --nav-list-color: #b3b3b3;
  --nav-list-color-active: #fff;
  --nav-list-bg-active: #282828;
}

.nav-list {
  margin: 0;
  padding: 0;
  list-style: none;
  &__item {
    padding: 0 0.5rem;
  }
  &__icon {
    .icon {
      font-size: 24px;
      &::before {
        color: var(--nav-list-color);
      }
    }
    &--heart {
      background-color: #0093E9;
      background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      .icon {
        font-size: 12px;
        &::before {
          color: #fff;
        }
      }
    }
  }
  &__text-link {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: normal;
    line-height: 18px;
    text-transform: none;
    color: var(--nav-list-color);
  }
  &__link {
    height: 40px;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s ease-in;
    &.nuxt-link-exact-active, &:hover {
      color: #fff;
      background: var(--nav-list-bg-active);
      .nav-list {
        &__icon {
          .icon {
            &::before {
              color: var(--nav-list-color-active);
            }
          }
        }
        &__text-link {
          color: var(--nav-list-color-active);
        }
      }
    }
    &:not(&.nuxt-link-active):hover {
      background: none;
    }
  }
}
</style>
