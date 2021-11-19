export default ($axios) => ({
  getArtistTopTrack (id) {
    return $axios.$get(`artists/${id}/top-tracks`, {
      params: {
        market: 'VN'
      }
    })
  },
  getArtist (id) {
    return $axios.$get(`artists/${id}`)
  },
  getArtistRelated (id) {
    return $axios.$get(`artists/${id}/related-artists`)
  }
})
