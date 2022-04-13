import { createAuthorizeURL } from '~/helpers/auth'
import { getDataAfterHashLocation } from '~/helpers'

export const state = () => ({
  accessToken: '',
  expiresIn: 3600,
  tokenType: 'Bearer',
  isRefreshing: false,
  isPremium: false,
  user: {}
})
export const getters = {
  isLoggedIn(state) {
    return state.accessToken !== ''
  }
}

export const mutations = {
  setAccessToken(state, payload) {
    state.accessToken = payload
    this.$cookies.set('access_token', payload)
  },
  setTokenType(state, payload) {
    state.tokenType = payload
  },
  setExpiresIn(state, payload) {
    state.expiresIn = payload
  },
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async initAuth({ commit }) {
    if (!window.location.hash) {
      window.location.href = createAuthorizeURL()
    }
    const hash = this.$router.currentRoute.hash
    if (hash) {
      const locationAfterHash = hash?.substr(1)?.split('&')
      const data = getDataAfterHashLocation(locationAfterHash)
      const { access_token: accessToken, token_type: tokenType, expires_in: expiresIn } = data
      commit('setTokenType', tokenType)
      commit('setAccessToken', accessToken)
      commit('setExpiresIn', expiresIn)
      const user = await this.$userApi.getMe()
      commit('setUser', user)
      this.$router.replace('/')
    }
  }
}
