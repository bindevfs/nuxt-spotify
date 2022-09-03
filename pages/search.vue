<template>
  <search />
</template>
<script>
export default {
  components: {
    Search: () => import('~/components/desktop/search/index.vue')
  }
}
</script>
