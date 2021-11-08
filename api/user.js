export default ($axios) => ({
  getMe () {
    return $axios.$get('/me')
  }
})
