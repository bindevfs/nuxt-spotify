<template>
  <div class="track-time">
    <a-slider
      v-model="valueSlider"
      :value="currentValue"
      :tip-formatter="null"
      :max="max"
      :style="{'--track-time-color': color }"
      @afterChange="handleAfterChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#1db954'
    },
    currentValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      valueSlider: 0
    }
  },
  watch: {
    currentValue (value) {
      this.valueSlider = value
    }
  },
  methods: {
    handleAfterChange (value) {
      this.$emit('afterChange', value)
    }
  }
}
</script>
<style lang="scss">
.track-time {
  --track-time-color: #1db954;
  .ant-slider-track {
    background-color: var(--track-time-color);
  }
  .ant-slider-handle {
    border: 2px solid var(--track-time-color);
  }
  .ant-slider-rail {
    background-color: #b3b3b3;
  }
  .ant-slider {
    margin: 0 4px 0;
    &:hover {
      .ant-slider-track {
        background-color: var(--track-time-color);
      }
      .ant-slider-handle:not(.ant-tooltip-open) {
        border-color: var(--track-time-color);
      }
    }
  }
  .ant-slider-handle[aria-valuenow="0"] {
     display: none;
  }
}
</style>
