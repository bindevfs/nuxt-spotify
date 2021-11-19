<template>
  <div class="track-info">
    <div class="track-info__wrap-img">
      <img src="https://i.scdn.co/image/ab67616d00004851d28b4546b16fc8e0000f277e" alt="">
    </div>
    <div class="track-info__content">
      <div class="track-info__name">
        Yeu Moi Nguoi Co Le
      </div>
      <div class="track-info__artists">
        Lou Hoang
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.track-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  &__wrap-img {
    position: relative;
    max-width: 60px;
    height: 60px;
    flex: 0 0 20%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__name {
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    @include clamp-text;
  }
  &__artists {
    font-size: 11px;
    line-height: 13px;
    color: #b3b3b3;
    margin-top: 4px;
  }
}
</style>
