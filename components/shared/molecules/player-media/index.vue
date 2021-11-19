<template>
  <s-layout-container
    :header="header"
    @clickTitle="handleClickTitle"
    @clickAll="handleClickViewAll"
  >
    <s-media
      v-for="(item, index) in playList"
      :key="`${index}_${item.id}`"
      :item="item"
      @click="handleClickMedia"
    />
  </s-layout-container>
</template>
<script>
import SLayoutContainer from '~/components/shared/ui/layout-container/index.vue'
import SMedia from '~/components/shared/ui/media/index.vue'
export default {
  components: {
    SLayoutContainer,
    SMedia
  },
  props: {
    playList: {
      type: Array,
      default: () => []
    },
    header: {
      type: [String, Object],
      required: true
    }
  },
  methods: {
    handleClickTitle () {
      //
    },
    handleClickViewAll () {
      //
    },
    handleClickMedia (item) {
      if (item.type === 'artist') {
        this.$router.push(`/artist/${item.id}`)
      }
    }
  }
}
</script>
