import Vue from 'vue'

Vue.filter('durationToMinutes', function(duration) {
  const minutes = Math.floor(duration / 60000)
  const seconds = Math.trunc(((duration % 60000) / 1000))
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
})
