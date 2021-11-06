<template>
  <div class="layout-container">
    <div class="layout-container__wrapper">
      <div class="layout-container__head">
        <h2 class="layout-container__title">
          <a href="javascript:void(0)" class="layout-container__title-link">
            Episodes for you
          </a>
        </h2>
        <div class="layout-container__view-all">
          <a href="javascript:void(0)" class="layout-container__link">SEE ALL</a>
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
    grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
  }
}
</style>
