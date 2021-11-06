<template>
  <div class="media">
    <div class="media__container">
      <div class="media__cover">
        <s-media-thumbnail />
        <div class="media__play">
          <s-play-button />
        </div>
      </div>
      <div class="media__content">
        <a class="media__song-name" href="javascript:void(0)">
          <div class="media__song-name_text">
            V-Pop Không Thể Thiếu
          </div>
        </a>
        <div class="media__desc">
          Đông tới Tây, đây là những ca khúc thịnh hành nhất ở Việt Nam. Ảnh bìa: Low G, Thắng
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SMediaThumbnail from '~/components/shared/ui/media/thumbnail'
import SPlayButton from '~/components/shared/ui/play-button'

export default {
  components: {
    SMediaThumbnail,
    SPlayButton
  }
}
</script>
<style lang="scss" scoped>
.media {
  cursor: pointer;
  &__container {
    background-color: #181818;
    padding: 1rem;
    border-radius: 4px;
    position: relative;
    width: 100%;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #282828;
    }
  }
  &__cover {
    margin-bottom: 1rem;
    position: relative;
  }
  &__song-name {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    text-decoration: none;
    &_text {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      @include clamp-text(1);
    }
  }
  &__play {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: all 0.2s ease-in;
  }
  &__desc {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 16px;
    text-transform: none;
    color: #b3b3b3;
    @include clamp-text(2);
    a {
      position: relative;
      z-index: 1;
      color: #b3b3b3;
    }
  }
  &:hover {
    .media {
      &__play {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
