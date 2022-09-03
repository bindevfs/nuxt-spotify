<template>
  <a-table
    table-layout="fixed"
    :columns="columns"
    :data-source="dataTable"
    :pagination="false"
    :custom-row="customRow"
  >
    <template slot="index" slot-scope="text, record, index">
      {{ index + 1 }}
    </template>
    <template slot="track" slot-scope="track">
      <div class="track">
        <div class="track__inner">
          <div class="track__wrap-img">
            <img :src="track.url" :alt="track.name" loading="lazy">
          </div>
        </div>
        <div class="track__inner">
          <div class="track__info">
            <div class="track__name">{{ track.name }}</div>
            <div class="track__artist">
              <template v-for="(artist, index) in track.artists">
                <nuxt-link
                  :key="`${index}_${artist.id}`"
                  :to="`/artist/${artist.id}`">
                  {{ artist.name }}
                </nuxt-link>
                <span v-if="index < track.artists.length - 1" :key="artist.id" class="comma">
              &#44;
            </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="album" slot-scope="album">
      <nuxt-link
        :to="`/album/${album.id}`">
        {{ album.name }}
      </nuxt-link>
    </template>
    <span slot="customDuration"><a-icon type="clock-circle" /></span>
    <span slot="fromToNow" slot-scope="date">
      {{ date | fromToNowDate }}
    </span>
    <span slot="duration" slot-scope="duration">
      {{ duration | durationToMinutes }}
    </span>
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
  },
  methods: {
    customRow(record) {
      console.log('e')
      return {
        dblclick: (event) => console.log('record', record, 'event', event)
      }
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
        padding: 6px 14px;
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
.track {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  &__name {
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  }
  &__artist {
    a {
      font-size: 14px;
      line-height: 18px;
      color: #b3b3b3;
    }
  }
  &__wrap-img {
    width: 40px;
    height: 40px;
    background: #b3b3b3;
    img {
      width: inherit;
      height: inherit;
      object-fit: cover;
      border-radius: 4px;
    }
  }
}
</style>
