<template>
  <section class="collection-track">
    <div class="collection-track__wrapper">
      <s-table-songs
        :columns="columns"
        :data-table="data"
        />
    </div>
  </section>
</template>
<script>
const columns = [
  {
    title: '#',
    key: 'index',
    scopedSlots: { customRender: 'index' }
  },
  {
    title: 'TITLE',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'ALBUM',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true
  },
  {
    title: 'DATE ADDED',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true
  },
  {
    title: '',
    dataIndex: 'duration',
    key: 'duration',
    scopedSlots: { customRender: 'duration' }
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default {
  components: {
    STableSongs: () => import('~/components/shared/molecules/table-songs')
  },
  data () {
    return {
      data,
      columns
    }
  },
  async fetch() {
    const response = await this.$trackApi.getTracks();
    console.log(response)
  }
}
</script>
<style lang="scss" scoped>
.collection-track {
  &__wrapper {
    padding: 1.5rem 2rem;
  }
}
</style>
