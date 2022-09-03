export const state = () => ({
  recentlyPlayedList: []
})

export const getters = {
  playList (state) {
    return state.recentlyPlayedList.map((item) => item.track)
  },
  getRecentlyPlayedList (state, getters, rootState, rootGetters) {
    return getters.playList
      .filter((track, idx, arr) => {
        return arr.findIndex((item) => item.id === track.id) === idx
      })
      .slice(0, 20);
  }
}

export const mutations = {
  setRecentlyPlayedList(state, payload) {
    state.recentlyPlayedList = payload
  }
}

export const actions = {
  async getRecentlyPlayedAction({ commit }) {
    try {
      const { items } = await this.$playerApi.getRecentlyPlayed()
      commit('setRecentlyPlayedList', items)
    } catch (e) {
      console.error(e)
    }
  }
}
