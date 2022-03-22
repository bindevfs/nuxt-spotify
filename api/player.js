export default ($axios) => ({
  getRecentlyPlayed () {
    return $axios.$get('me/player/recently-played', {
      params: {
        limit: 10
      }
    })
  },
  transferUserPlayback (deviceId) {
    return $axios.$put('me/player', {
      device_ids: [deviceId],
      play: true
    })
  }
})
