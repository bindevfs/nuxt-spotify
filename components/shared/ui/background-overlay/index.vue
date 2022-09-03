<template>
  <canvas id="bg-overlay"></canvas>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      context: null,
      canvas: null
    }
  },
  watch: {
    url: {
      handler () {
        if (!this.context) {
          this.initCanvas();
        }
        this.drawImageToCanvas()
      }
    }
  },
  methods: {
    initCanvas () {
      const canvas = document.getElementById('bg-overlay')
      this.canvas = canvas
      this.context = canvas.getContext('2d')
      this.context.filter = 'blur(15px)'
      this.context.globalAlpha = 0.07
    },
    drawImageToCanvas () {
      const imageObj = new Image()
      imageObj.src = this.url
      const vm = this
      imageObj.onload = function () {
        if (vm.context) {
          vm.context.clearRect(0, 0, vm.canvas.width, vm.canvas.height)
          vm.context.drawImage(imageObj, 0, 0);
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  overflow: hidden;
  pointer-events: none;
}
</style>
