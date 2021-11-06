<template>
  <div>
    <h1>Search</h1>
    <base-button></base-button>
  </div>
</template>
<script>
export default {
  components: {
    BaseButton: () => import('~/components/shared/ui/base/button')
  }
}
</script>
