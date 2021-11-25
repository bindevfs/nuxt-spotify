<template>
  <div class="recently-played">
    <div class="recently-played__list">
      <div v-for="i in 6" :key="i" class="recently-played__item">
        <div class="recently-played__wrap-img">
          <div class="recently-played__bg-img">
            <img src="https://i.scdn.co/image/ab6761610000e5ebc48716f91b7bf3016f5b6fbe" alt="Image">
          </div>
        </div>
        <div class="recently-played__right">
          <a href="#">Sơn Tùng M-TP</a>
          <div class="recently-played__action">
            <s-play-button />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SPlayButton from '~/components/shared/ui/play-button'

export default {
  components: {
    SPlayButton
  }
}
</script>
<style lang="scss" scoped>
* {
  --minimumColumnWidth: 270px;
  --rowGap: 24px;
  --colGap: 24px;
  --border-radius: 4px;
}
.recently-played {
  &__list {
    display: grid;
    grid-gap: var(--rowGap) var(--colGap);
    grid-template-columns: repeat(auto-fill,minmax(var(--minimumColumnWidth), 1fr));
  }
  &__item {
    display: flex;
    background: rgba(255,255,255,.1);
    transition: background .3s ease;
    border-radius: var(--border-radius);
    &:hover {
      background: rgba(255,255,255,.2);
    }
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    flex: 1;
    a {
      color: #fff;
      text-decoration: none;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 700;
    }
  }
  &__wrap-img {
    min-width: 80px;
    min-height: 80px;
  }
  &__bg-img {
    background-color: rgba(255,255,255,.2);
    border-radius: 4px;
    -webkit-box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    img {
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      border-radius: var(--border-radius) 0 0 var(--border-radius);
    }
  }
  &__action {
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border-radius: 100px;
  }
}
</style>
