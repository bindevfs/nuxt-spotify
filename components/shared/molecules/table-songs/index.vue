<template>
  <a-table
    table-layout="fixed"
    :columns="columns"
    :data-source="dataTable"
    :pagination="false"
  >
    <template slot="index" slot-scope="text, record, index">
      {{ index + 1 }}
    </template>
    <a slot="name" slot-scope="text">{{ text }}</a>
    <template slot="duration">
      <a-icon type="clock-circle" />
    </template>
  </a-table>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataTable: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .ant-table {
    color: #b3b3b3;
  }
  .ant-table-placeholder {
    border-bottom: none;
    border-top: none;
    background: rgba(255, 255, 255, 0.1);
  }
  .ant-empty-normal {
    color: #fff;
  }
  .ant-table-tbody {
    > tr {
      > td {
        border-bottom: none;
      }
    }
  }
  .ant-table-thead {
    > tr {
      &:hover {
        > td {
          background: rgba(255, 255, 255, 0.1);
        }
      }
      > th {
        background: transparent;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #b3b3b3;
        text-transform: uppercase;
      }
    }
  }
}
</style>
