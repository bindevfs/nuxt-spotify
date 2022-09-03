export default ($axios) => ({
  search ({
            q = '',
            type = 'track,artist,album,playlist',
            limit = 8}) {
    return $axios.$get('search', {
      params: {
        q,
        type,
        limit
      }
    })
  }
})
