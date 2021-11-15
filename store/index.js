export const actions = {
  nuxtServerInit ({ commit }, {
    app
  }) {
    const accessToken = app.$cookies.get('access_token', { parseJSON: true })
    if (accessToken) {
      commit('auth/setAccessToken', accessToken)
    } else {
      commit('auth/setAccessToken', null)
    }
  },
}
