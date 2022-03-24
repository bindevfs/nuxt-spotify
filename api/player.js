export default ($axios) => ({
  getRecentlyPlayed () {
    return $axios.$get('me/player/recently-played', {
      params: {
        limit: 50
      }
    })
  },
  getCurrentPlayBack () {
    return $axios.$get('me/player')
  },
  transferUserPlayback (deviceId) {
    return $axios.$put('me/player', {
      device_ids: [deviceId],
      play: true
    })
  },
  pause () {
    return $axios.$put('me/player/pause')
  },
  play (request) {
    return $axios.$put('me/player/play', request)
  },
  seek (positionMs) {
    return $axios.$put(`me/player/seek?position_ms=${positionMs}`)
  },
  next () {
    return $axios.post('me/player/next')
  },
  prev () {
    return $axios.$post('me/player/previous')
  }
})
