export default ($axios) => ({
  getBrowseAllCategories () {
    return $axios.$get('browse/categories', {
      params: {
        limit: 50,
        offset: 10,
        country: 'VN'
      }
    })
  },
  getCategoryPlaylists (categoryId) {
    return $axios.$get(`browse/categories/${categoryId}/playlists`, {
      params: {
        limit: 50,
        offset: 10,
        country: 'VN'
      }
    })
  },
  getFeaturedPlayLists () {
    return $axios.$get(`browse/featured-playlists`, {
      params: {
        limit: 50,
        country: 'VN'
      }
    })
  }
})
