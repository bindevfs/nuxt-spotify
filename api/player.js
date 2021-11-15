export default ($axios) => ({
  getRecentlyPlayed () {
    return $axios.$get('me/player/recently-played', {
      params: {
        limit: 10
      }
    })
  }
})
