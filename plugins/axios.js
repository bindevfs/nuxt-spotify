export default ({ $axios, store, redirect }) => {
  $axios.onRequest(config => {
    const token = store.state.auth.accessToken
    console.log(token)
    if (token) {
      $axios.setHeader('Authorization', `Bearer ${token}`)
    }
  })
}
