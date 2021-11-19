<template>
  <section class="collection-track">
  </section>
</template>
<script>
export default {
  async fetch() {
    const response = await this.$trackApi.getTracks();
    console.log(response)
  }
}
</script>
