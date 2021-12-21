<template>
  <section class="collection-track">
    <s-layout-presentation
      :thumb-url="require('/static/images/commons/like-songs.svg')"
      :rounded="false"
      background-head-color="linear-gradient(143.01deg, #0093E9 26.11%, #80D0C7 93.76%)"
      :is-loading="$fetchState.pending"
    >
      <template #name>
        Liked Songs
      </template>
      <template #desc>
        {{ items.length }} songs
      </template>
      <template #body>
        <div class="collection-track__wrapper">
          <s-table-songs
            :columns="columns"
            :data-table="songsUserSaved"
          />
        </div>
      </template>
    </s-layout-presentation>
  </section>
</template>
<script>
const columns = [
  {
    title: '#',
    key: 'index',
    scopedSlots: { customRender: 'index' },
    width: 60
  },
  {
    title: 'TITLE',
    dataIndex: 'track',
    key: 'track',
    ellipsis: true,
    scopedSlots: { customRender: 'track' }
  },
  {
    title: 'ALBUM',
    dataIndex: 'album',
    key: 'album',
    scopedSlots: { customRender: 'album' },
    slots: { title: 'customAlbum' },
    ellipsis: true
  },
  {
    title: 'DATE ADDED',
    dataIndex: 'added_at',
    key: 'added_at',
    ellipsis: true,
    scopedSlots: { customRender: 'fromToNow' },
    slots: { title: 'customFromToNow' },
    width: 120
  },
  {
    dataIndex: 'duration',
    key: 'duration',
    scopedSlots: { customRender: 'duration' },
    slots: { title: 'customDuration' },
    width: 80
  }
];

export default {
  components: {
    STableSongs: () => import('~/components/shared/molecules/table-songs'),
    SLayoutPresentation: () => import('~/components/shared/molecules/layout-presentation')
  },
  data () {
    return {
      columns,
      items: []
    }
  },
  async fetch() {
    const response = await this.$trackApi.getTracks();
    this.items = response.items
  },
  computed: {
    songsUserSaved () {
      return this.items.map(({ track, added_at: addedAt }) => {
        return {
          track: {
            name: track.name,
            url: track.album?.images[0]?.url,
            artists: track.artists,
          },
          album: track.album,
          duration: track.duration_ms,
          added_at :addedAt
        }
      })
    }
  }
}
</script>
