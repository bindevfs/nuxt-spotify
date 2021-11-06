<template>
  <div class="profile">
    <a-dropdown :trigger="['click']">
      <div class="profile__inner">
        <div class="profile__avatar">
          <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1236206846568760&height=300&width=300&ext=1638757936&hash=AeSNFhIrFPBuuJkRRV0" alt="Avatar" />
        </div>
        <div class="profile__name">
          <span>LE DINH HUAN NAME LE</span>
        </div>
      </div>
      <a-menu slot="overlay" class="profile__top-bar">
        <a-menu-item class="profile__top-bar_item">
          <a href="javascript:">Account</a>
        </a-menu-item>
        <a-menu-item class="profile__top-bar_item">
          <a href="javascript:">Profile</a>
        </a-menu-item>
        <a-menu-item class="profile__top-bar_item">
          <a href="javascript:">Log Out</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<style lang="scss" scoped>
.profile {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 27px;
  padding: 0.5rem;
  cursor: pointer;
  &__inner {
    @include flex-center;

    justify-content: space-between;
  }
  &__name {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #fff;
    max-width: 120px;
    margin: 0 0.5rem;
    @include clamp-text;
  }
  &__avatar {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: inherit;
      width: 100%;
      height: 100%;
    }
  }
}
.ant-dropdown-menu {
  background-color: #282828;
  border-radius: 4px;
  max-height: calc(100vh - 24px);
  @include box-shadow(0 16px 24px rgba(0, 0, 0, 0.3), 0 6px 8px rgba(0, 0, 0, 0.2));
}
.ant-dropdown {
  top: 40px;
}
.ant-dropdown-menu-item {
  padding: 12px;
  > a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
  }
  &.ant-dropdown-menu-item-active {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
