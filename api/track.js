export default ($axios) => ({
  getTracks () {
    return $axios.$get('me/tracks', {
      params: {
        limit: 50
      }
    })
  }
})
