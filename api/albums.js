export default ($axios) => ({
  getAlbum (id) {
    return $axios.$get(`albums/${id}`)
  }
})
